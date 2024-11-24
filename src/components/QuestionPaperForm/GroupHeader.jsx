const GroupHeader = ({ group, onTitleChange, onInstructionsChange }) => {
    return (
      <div className="bg-gray-100 text-center font-bold py-2 border border-black">
        <input 
          className="text-lg text-center w-full bg-transparent"
          value={group.title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <input 
          className="text-center w-full bg-transparent"
          placeholder="Add instructions for this group..."
          value={group.instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
        />
      </div>
    );
  };

  export default GroupHeader;