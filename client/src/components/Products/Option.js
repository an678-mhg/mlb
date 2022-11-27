import React from "react";

const Option = ({ content, checkedInput, setCheckedInput }) => {
  const handleOnchange = (value) => {
    const check = checkedInput?.filter((p) => p === value);
    if (check.length === 0) {
      setCheckedInput([value]);
    } else {
      setCheckedInput(checkedInput.filter((p) => p !== value));
    }
  };

  return (
    <label
      className={`p-2 rounded-md border-2 flex items-center bg-white cursor-pointer`}
      htmlFor={`checked-input-${content}`}
    >
      <input
        id={`checked-input-${content}`}
        type={"checkbox"}
        checked={checkedInput?.includes(content)}
        className="mr-1"
        onChange={() => handleOnchange(content)}
      />
      <p>{content}</p>
    </label>
  );
};

export default Option;
