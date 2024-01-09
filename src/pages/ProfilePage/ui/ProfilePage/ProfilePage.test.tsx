import { screen, waitFor } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { componentRender } from '@/shared/config/tests/componentRender';
import { profilePageReducer } from '../../model/slice/profilePageSlice';
import { createTestServer } from '@/shared/config/tests/createTestServer';
import { http, HttpResponse } from 'msw';
import { API_ROUTES } from '@/shared/api';
import { mockedProfile, mockedUser } from '@/shared/mocks';
import { RoutePath } from '@/shared/config';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { COMMON_API_ERRORS } from '@/shared/constants';

const server = createTestServer();

const ProfileRoute = (
  <Routes>
    <Route path={RoutePath.profile(':id')} element={<ProfilePage />} />
  </Routes>
);

const renderCurrentUserProfile = () => componentRender(ProfileRoute, {
  asyncReducers: { profilePage: profilePageReducer, },
  initialState: { user: { authData: mockedUser, }, },
  route: RoutePath.profile(1),
});

describe('pages/ProfilePage', () => {
  test('save and cancel buttons appears after clicking edit', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const editButton = screen.getByTestId('ProfilePageHeader.EditButton');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const saveButton = screen.getByTestId('ProfilePageHeader.SaveButton');
    const cancelButton = screen.getByTestId('ProfilePageHeader.CancelButton');

    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('Fields are viewed correctly', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const loader = screen.getByTestId('ProfileCard.Loader');
    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const nameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput).toHaveValue(mockedProfile.firstname);

    const lastnameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Lastname.Input.Value');
    expect(lastnameInput).toHaveValue(mockedProfile.lastname);

    const ageInput: HTMLInputElement = screen.getByTestId('ProfileCard.Age.Input.Value');
    expect(ageInput).toHaveValue(String(mockedProfile.age));

    const avatarInput: HTMLInputElement = screen.getByTestId('ProfileCard.Avatar.Input.Value');
    expect(avatarInput).toHaveValue(mockedProfile.avatar);

    const usernameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Username.Input.Value');
    expect(usernameInput).toHaveValue(mockedProfile.username);

    const currencyInput = screen.getByTestId('ProfileCard.Currency.CustomListBox.Value');
    expect(currencyInput).toHaveTextContent(mockedProfile.currency as string);

    const countryInput = screen.getByTestId('ProfileCard.Country.CustomListBox.Value');
    expect(countryInput).toHaveTextContent(mockedProfile.country as string);
  });

  test('Cancel button resets values', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    renderCurrentUserProfile();

    const loader = screen.getByTestId('ProfileCard.Loader');
    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const editButton = screen.getByTestId('ProfilePageHeader.EditButton');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const nameInput = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput).toHaveValue(mockedProfile.firstname);

    const lastnameInput: HTMLInputElement = screen.getByTestId('ProfileCard.Lastname.Input.Value');
    expect(lastnameInput).toHaveValue(mockedProfile.lastname);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'name');
    expect(nameInput).toHaveValue('name');

    await userEvent.clear(lastnameInput);
    await userEvent.type(lastnameInput, 'lastname');
    expect(lastnameInput).toHaveValue('lastname');

    const cancelButton = screen.getByTestId('ProfilePageHeader.CancelButton');
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);

    expect(nameInput).toHaveValue(mockedProfile.firstname);
    expect(lastnameInput).toHaveValue(mockedProfile.lastname);
  });

  test('Root error must appear for server failed response', async () => {
    server.use(http.get(API_ROUTES.profile('1'), () => HttpResponse.json(mockedProfile)));
    server.use(http.patch(API_ROUTES.profile('1'), () => new HttpResponse(null, { status: 500, })));
    renderCurrentUserProfile();

    const loader = screen.getByTestId('ProfileCard.Loader');
    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    const editButton = screen.getByTestId('ProfilePageHeader.EditButton');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const saveButton = screen.getByTestId('ProfilePageHeader.SaveButton');
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

    const editButton = screen.getByTestId('ProfilePageHeader.EditButton');
    await waitFor(() => { expect(editButton).toBeInTheDocument(); });

    await userEvent.click(editButton);

    const nameInput = screen.getByTestId('ProfileCard.Firstname.Input.Value');
    expect(nameInput).toHaveValue(mockedProfile.firstname);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'TEST_TEST');

    const saveButton = screen.getByTestId('ProfilePageHeader.SaveButton');
    expect(saveButton).toBeInTheDocument();
    await userEvent.click(saveButton);

    await waitFor(() => { expect(loader).not.toBeInTheDocument(); });

    expect(screen.queryByTestId('ProfileCard.Root.Error.Paragraph')).not.toBeInTheDocument();

    expect(nameInput).toHaveValue('TEST_TEST');
  });
});
