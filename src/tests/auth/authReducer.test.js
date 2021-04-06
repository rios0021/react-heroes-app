import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Tests in authReducer', () => {
    
    test('should Return the default state', () => {
        const state = authReducer({logged:false}, {});
        expect(state).toEqual({logged:false});
        
    });
    
    test('should authenticate y show user name', () => {
        const state = authReducer({logged:false}, {
            type: types.login,
            payload: {
                name: 'Eduardo'
            }
        });
        expect(state).toEqual({name: 'Eduardo', logged:true});
    });
    
    test('should erase user name and looged = false', () => {
        const state = authReducer({name: 'Eduardo', logged: true}, {
            type: types.logout
        });
        
        expect(state).toEqual({logged:false});
    });
    
})
