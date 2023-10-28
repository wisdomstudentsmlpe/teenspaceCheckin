import { useState, createContext } from "react";

export const FirebaseContext = createContext(null)
export const RegStudentsContext = createContext(null)
export const AuthContext = createContext(null)



export default function Context({ children }) {

    const [regStudents, setRegStudents] = useState([])
    const [user, setUser] = useState(null)


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <RegStudentsContext.Provider value={{ regStudents, setRegStudents }}>
                {children}
            </RegStudentsContext.Provider>
        </AuthContext.Provider>

    )
}