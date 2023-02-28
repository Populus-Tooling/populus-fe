export const inputStyle = {
    width: "100%",
    input: {
      color: 'rgba(0, 0, 0, 1)',
      my: "1px",
  
      "&::placeholder": {
        color: 'rgba(0, 0, 0, 1)'
      },
  
  
    },
    borderRadius: 2,
    "& label.MuiInputLabel-root": {
      color: "rgba(0, 0, 0, 1)",
    },
    "& label.Mui-focused": {
      color: "rgba(0, 0, 0, 1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(0, 0, 0, 1)",
  
    },
  
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 1)",
        borderRadius: "7px",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 1)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 0, 0, 1)",
      },
  
    }
  }
  
  export const dateInputStyle = {
    width: "100%",
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    svg: { color: "rgba(255, 255, 255, 1) " },
    input: {
      my: "1px",
      "&::placeholder": {
        color: 'rgba(255, 255, 255, 1)'
      },
      color: 'rgba(255, 255, 255, 1)',
    },
  
    "& label": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& label.Mui-focused": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, 0.2)",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 1)",
      },
  
  
    },
  }
  
  export const comboSelectStyle = {
    width: "40%",
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    svg: { color: "rgba(255, 255, 255, 1) " },
  
    "& label": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& label.Mui-focused": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, 0.2)",
    },
    "& div .MuiSelect-select": {
      my: "1px",
      color: "#ffffff"
    },
    "& .MuiOutlinedInput-root": {
  
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 1)",
      },
  
  
    },
  }
  export const comboSelectStyleSmall = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    svg: { color: "rgba(255, 255, 255, 1) " },
    "& label": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& label.Mui-focused": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, 0.2)",
    },
    "& div .MuiSelect-select": {
      my: "1px",
      color: "#ffffff",
    },
    "& .MuiOutlinedInput-root": {
  
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: " 0 7px 7px 0",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 1)",
      },
  
  
    },
  }
  
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  export const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  
  export const inputStyleRounded = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    input: {
      color: 'rgba(255, 255, 255, 1)',
      my: "1px",
  
      "&::placeholder": {
        color: 'rgba(255, 255, 255, 1)'
      },
  
  
    },
  
    "& label.MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& label.Mui-focused": {
      color: "rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(255, 255, 255, 0.2)",
  
    },
  
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: "7px 0 0 7px",
  
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.2)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(255, 255, 255, 1)",
      },
  
    }
  }
  