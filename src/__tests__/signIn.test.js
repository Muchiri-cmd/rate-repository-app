import { render,screen,fireEvent,waitFor } from '@testing-library/react-native';
import SignIn from '../components/SignIn';
import useSignIn from '../hooks/useSignIn';

jest.mock('../hooks/useSignIn');

describe('SignIn',() => {
  describe('SignInContainer',() => {
    it('calls onSubmit function wih correct arguments when a valid form is submitted', async() => {
      const mockSignIn = jest.fn();
      useSignIn.mockReturnValue([mockSignIn]);
      
      //render signIn component,fill text inputs and press submit
      render(<SignIn/>)

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const signInButton = screen.getByText('Sign in');

      // Simulate filling out the form
      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');

      // Simulate pressing the sign-in button
      fireEvent.press(signInButton);

      await waitFor(() => {
        //expect onSubmit func to have been called once and with correct first arg
        expect(mockSignIn).toHaveBeenCalledTimes(1);

        expect(mockSignIn).toHaveBeenCalledWith({
          username:'kalle',
          password:'password'
        });

      })
    })
  })
})