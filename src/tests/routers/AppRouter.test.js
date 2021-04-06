import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";


describe('Tests in the <AppRouter />', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:false
        }
    }
    test('should show login if user is not authenticated', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    
    test('should show marvel component if user is logged', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user:{
                logged:true,
                name: 'Eduardo'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        );
        expect(wrapper.find('.navbar').exists()).toBe(true);
        
    })
    
    
})
