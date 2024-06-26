import { screen, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { componentRender, createTestServer } from '@/shared/config/tests';
import { profilePageReducer } from '../../model/slice/profilePageSlice';
import { http, HttpResponse } from 'msw';
import { API_ROUTES } from '@/shared/api';
import { mockedProfile, mockedUser } from '@/shared/mocks';
import { RoutePath } from '@/shared/config';
import { Outlet } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { COMMON_API_ERRORS } from '@/shared/constants';

const server = createTestServer();

const renderCurrentUserProfile = () => componentRender(<Outlet/>, {
  asyncReducers: { profilePage: profilePageReducer, },
  initialState: { user: { authData: mockedUser, }, },
  route: RoutePath.profile(1),
  routeConfig: [{
    path: RoutePath.profile(':id'),
    element: <ProfilePage/>,
  },],
});

describe('pages/ProfilePage', () => {
  test('save and cancel buttons appears after clicking edit', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const editButton = screen.getByTestId('ProfilePageHeader.Edit.Button');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const saveButton = screen.getByTestId('ProfilePageHeader.Save.Button');
    const cancelButton = screen.getByTestId('ProfilePageHeader.Cancel.Button');

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Fields are viewed correctly', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const nameInput: HTMLInputElement = await screen.findByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput.value).toBe(mockedProfile.firstname);

    const lastnameInput: HTMLInputElement = await screen.findByTestId('ProfileCard.Lastname.Input.Value');
    expect(lastnameInput.value).toBe(mockedProfile.lastname);

    const ageInput: HTMLInputElement = await screen.findByTestId('ProfileCard.Age.Input.Value');
    expect(ageInput.value).toBe(String(mockedProfile.age));

    const avatarInput: HTMLInputElement = await screen.findByTestId('ProfileCard.Avatar.Input.Value');
    expect(avatarInput.value).toBe(mockedProfile.avatar);

    const usernameInput: HTMLInputElement = await screen.findByTestId('ProfileCard.Username.Input.Value');
    expect(usernameInput.value).toBe(mockedProfile.username);

    const currencyInput = await screen.findByTestId('ProfileCard.Currency.CustomListBox.Value');
    expect(currencyInput).toHaveTextContent(mockedProfile.currency as string);

    const countryInput = await screen.findByTestId('ProfileCard.Country.CustomListBox.Value');
    expect(countryInput).toHaveTextContent(mockedProfile.country as string);
  });

  test('Cancel button resets values', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const editButton = await screen.findByTestId('ProfilePageHeader.Edit.Button');
    expect(editButton).toBeInTheDocument();

    await userEvent.click(editButton);

    let nameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput.value).toBe(mockedProfile.firstname);

    let lastnameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Lastname.Input.Value');
    expect(lastnameInput.value).toBe(mockedProfile.lastname);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'name');
    expect(nameInput.value).toBe('name');

    await userEvent.clear(lastnameInput);
    await userEvent.type(lastnameInput, 'lastname');
    expect(lastnameInput.value).toBe('lastname');

    const cancelButton = screen.getByTestId('ProfilePageHeader.Cancel.Button');
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);

    nameInput = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    lastnameInput = screen.getByTestId('ProfileCard.Lastname.Input.Value');

    expect(nameInput.value).toBe(mockedProfile.firstname);
    expect(lastnameInput.value).toBe(mockedProfile.lastname);
  });

  test('Root error must appear for server failed response', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    server.use(http.patch(API_ROUTES.profile('1'), () => new HttpResponse(null, { status: 500, })));
    renderCurrentUserProfile();

    const loader = screen.getByTestId('ProfileCard.Loader');
    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const editButton = screen.getByTestId('ProfilePageHeader.Edit.Button');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const saveButton = screen.getByTestId('ProfilePageHeader.Save.Button');
    expect(saveButton).toBeInTheDocument();
    await userEvent.click(saveButton);

    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const rootError = screen.getByTestId('ProfileCard.Root.Error.Paragraph');
    expect(rootError).toBeInTheDocument();
    expect(rootError).toHaveTextContent(COMMON_API_ERRORS.UNKNOWN_ERROR);
  });

  test('Success saving form when input changed', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    server.use(
      http.patch(API_ROUTES.profile('1'),
        async ({ request, }) => (
          HttpResponse.json(await request.json())
        )
      ));
    renderCurrentUserProfile();

    const loader = screen.getByTestId('ProfileCard.Loader');
    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const editButton = screen.getByTestId('ProfilePageHeader.Edit.Button');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const nameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput.value).toBe(mockedProfile.firstname);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'TEST_TEST');

    const saveButton = screen.getByTestId('ProfilePageHeader.Save.Button');
    expect(saveButton).toBeInTheDocument();
    await userEvent.click(saveButton);

    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    expect(screen.queryByTestId('ProfileCard.Root.Error.Paragraph')).not.toBeInTheDocument();

    expect(nameInput.value).toBe('TEST_TEST');
  });
});
