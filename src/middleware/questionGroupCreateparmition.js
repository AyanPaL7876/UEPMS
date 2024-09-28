import mongoose from "mongoose";
import { User, QuestionPaper } from "@/modules";

export const questionGroupCreateparmition = async (user, questionPaperId) => {
  if (!user || !questionPaperId) {
    return {
      success: false,
      message: "User ID and Question Paper ID are required",
      status: 400,
    };
  }

  try {
    // Validate that the IDs are valid MongoDB ObjectIds
    if (!mongoose.isValidObjectId(questionPaperId)) {
      return {
        success: false,
        message: "Invalid Question Paper ID format",
        status: 400,
      };
    }

    // Find the question paper and populate its questionGroups
    const questionPaper = await QuestionPaper.findById(questionPaperId);
    if (!questionPaper) {
      return {
        success: false,
        message: "Question Paper not found",
        status: 404,
      };
    }

    // Check if the user has already created a question group for this question paper
    if (questionPaper.questionGroups.length !== 0) {
      const existingQuestionGroup = user.createdQuestionPpapers.find(
        (createdQuestionPaper) =>
          questionPaper.questionGroups.includes(createdQuestionPaper)
      );

      if (existingQuestionGroup) {
        return {
          success: false,
          message: "You already created one QuestionGroup for this paper.",
          status: 403,
          existingQuestionPaper: existingQuestionGroup,
        };
      }
    }

    // Check if the user has permission to access the question paper
    let parmition;
    if (user.role === "Teacher") {
      parmition = questionPaper.allocatedTeachers.some(
        (teacher) => teacher.toString() === user._id.toString()
      );
    } else if (user.role === "HOD") {
      parmition =
        questionPaper.allocatedHods.toString() === user._id.toString();
    }

    // If the user does not have permission, return an error
    if (!parmition) {
      return {
        success: false,
        message: "You do not have permission to access this question paper",
        status: 403,
      };
    }

    return {
      success: true,
      questionPaper,
      message: "You can question paper",
      status: 200,
    };
  } catch (error) {
    console.error("Error in checkQuestionGroupExist:", error);
    return { success: false, message: "Internal server error", status: 500 };
  }
};

export default questionGroupCreateparmition;
