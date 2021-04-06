import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen";


describe('Tests in HeroScreen', () => {
    
    const historyMock = {
        lenght:10,
        push: jest.fn(),
        goBack: jest.fn()
    }
    
    
    test('should show Redirect component if there are no arguments in the URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );
        
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    
    test('should show a hero if the parameter exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={HeroScreen}/>
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
    });
    
    test('should go the previous screen with push', () => {
        
        const historyMock = {
            lenght:1,
            push: jest.fn(),
            goBack: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroId" 
                    component={() => <HeroScreen history={historyMock}/>}/>
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();
        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled();
    });
    
})
