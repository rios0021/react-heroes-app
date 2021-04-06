import { mount } from "enzyme"
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";

describe('Tests in the login screen', () => {
    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should do the dispatch and navegation', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        
        handleClick();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            "payload": {
                "name": "Eduardo",
            },
            "type": "[auth] login",
        });
        expect(history.replace).toHaveBeenCalledWith('/');
        localStorage.setItem('lastPath','/dc');
        handleClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
    })


})
