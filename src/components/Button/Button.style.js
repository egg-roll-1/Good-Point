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
    brightLogin: {
      ...baseButtonStyle,
      width: '300px',
      height: '60px',
      backgroundColor: '#ffffff',
      border: '1px solid #3b82f6',
      color: '#3b82f6',
    },
    duplicate: {
      ...baseButtonStyle,
      width: '90px',
      height: '60px',
      backgroundColor: '#3b82f6',
      border: 'none',
      color: '#ffffff',
      fontSize: '14px'
    },
    action: {
      ...baseButtonStyle,
      width: '150px',
      height: '40px',
      backgroundColor: '#3b82f6',
      border: 'none',
      color: '#ffffff',
    }
  };