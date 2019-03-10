import { AuthenticationRoutingModule } from './authentication-routing.module';

describe('AuthenticationRoutingModule', () => {
  let authenticationRoutingModule: AuthenticationRoutingModule;

  beforeEach(() => {
    authenticationRoutingModule = new AuthenticationRoutingModule();
  });

  it('should create an instance', () => {
    expect(authenticationRoutingModule).toBeTruthy();
  });
});
