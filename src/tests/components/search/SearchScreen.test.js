import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Tests in SearchScreen', () => {
    
    test('should show correctly with default values', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
    });
    
    test('should show batman and the input with the value of queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });
    
    test('should show an error if hero is not found', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1234']}>
                <Route path='/search' component={SearchScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('.alert-warning').exists()).toBe(true);
        
    });
    
    test('should call history push', () => {
        const history = {
            push: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman1234']}>
                <Route path='/search' component={ () => <SearchScreen history={history}/>} />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchString',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);
    })
    
    
    
    
})
