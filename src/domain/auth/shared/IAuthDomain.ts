export interface IAuthDomain {
    encrypt(password: string): Promise<string>;
    validateLogedUser(user: any): Promise<boolean>;
    generateBasicAuthToken(location: any);
  }
  