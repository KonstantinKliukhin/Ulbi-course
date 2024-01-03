import { validateProfile } from './validateProfile';
import { mockedProfile } from 'shared/mocks';
import * as Yup from 'yup';

describe('getProfileValidationSchema', () => {
  test('should return profile if all fields are correct', (done) => {
    validateProfile().validate(mockedProfile, { abortEarly: false, })
      .then(profile => {
        expect(profile).toEqual(mockedProfile);
      })
      .catch(done)
      .finally(done);
  });

  test('should return return error for each incorrect field', (done) => {
    const invalidProfile = {
      username: '',
      age: 999999,
      firstname: '',
      lastname: '',
      city: '',
      country: 'some invalid country',
      currency: 'some invalid currency',
      avatar: 'some invalid avatar',
    };
    validateProfile().validate(invalidProfile, { abortEarly: false, })
      .then(() => {
        throw new Error("Profile Shouldn't be valid here");
      })
      .catch((errors) => {
        expect(errors).toBeInstanceOf(Yup.ValidationError);

        if (errors instanceof Yup.ValidationError) {
          expect(errors.inner).toHaveLength(8);
        }
      })
      .finally(done);
  });
});
