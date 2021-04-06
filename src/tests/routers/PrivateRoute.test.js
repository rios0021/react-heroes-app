import { mount } from "enzyme"
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute";


describe('Tests in PrivateRoute', () => {
    const props = {
        location:{
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('should show the component if it is authenticated and save to Local Storage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>Ready!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
    });
    
    test('should block the component if its not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => <span>Ready!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        expect(wrapper.find('span').exists()).toBe(false);
    })
    
    
})
