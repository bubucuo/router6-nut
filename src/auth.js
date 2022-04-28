import React from "react";

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };
  const signout = (callback) => {
    setUser(null);
    callback();
  };

  let value = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value} children={children} />;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
