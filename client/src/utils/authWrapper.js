import { UserAuthWrapper } from 'redux-auth-wrapper';

// export a simple function with receives some options and return the wrapper
export default (options) => UserAuthWrapper(options);