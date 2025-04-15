const baseButtonStyle = {
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '10px',
  };
  
  export const buttonStyles = {
    login: {
      ...baseButtonStyle,
      width: '300px',
      height: '60px',
      backgroundColor: '#3b82f6',
      border: 'none',
      color: '#ffffff',
    },
    duplicate: {
      ...baseButtonStyle,
      width: '90px',
      height: '60px',
    },
    action: {
      ...baseButtonStyle,
      width: '150px',
      height: '40px',
    }
  };

