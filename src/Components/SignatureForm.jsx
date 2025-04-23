import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignature } from '../context/SignatureContext';
import styles from './SignatureForm.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const signatureFormSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  title: yup.string().required('Job title is required'),
  phone: yup.string().optional(),
  email: yup.string().email('Invalid email format').required('Email is required'),
  showLinkedin: yup.string().oneOf(['yes', 'no']),
  linkedin: yup.string().when('showLinkedin', {
    is: 'yes',
    then: (schema) =>
      schema
        .required('LinkedIn link is required')
        .matches(/(linkedin\.com)/, 'Must be a valid LinkedIn URL'),
    otherwise: (schema) => schema.optional(),
  }),
  showPhoto: yup.boolean(),
  showFacebook: yup.boolean(),
  showTwitter: yup.boolean(),
  showCompanyLinkedin: yup.boolean(),
});

function SignatureForm({ onSubmit }) {
  const { setSignatureData } = useSignature();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      title: '',
      phone: '',
      email: '',
      linkedin: '',
      showLinkedin: 'yes',
      showPhoto: true,
      showFacebook: true,
      showTwitter: true,
      showCompanyLinkedin: true
    },
    resolver: yupResolver(signatureFormSchema)
  });

  const showLinkedin = watch('showLinkedin');
  const showPhoto = watch('showPhoto');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setPhotoPreview(null);
  };

  const handleFinalSubmit = (data) => {
    setSignatureData({ ...data, photo: photoPreview });
    navigate('/signature');
    reset();
    setPhotoPreview(null);
  };

  return (
    <form className={styles['signature-form']} onSubmit={handleSubmit(handleFinalSubmit)}>
      <h2 className={styles['signature-form__title']}>Email Signature Form</h2>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Full name:</label>
        <input className={styles['signature-form__input']} {...register('name')} />
        {errors.name && <p className={styles['signature-form__error']}>{errors.name.message}</p>}
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Job title:</label>
        <input className={styles['signature-form__input']} {...register('title')} />
        {errors.title && <p className={styles['signature-form__error']}>{errors.title.message}</p>}
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Phone number:</label>
        <input className={styles['signature-form__input']} {...register('phone')} />
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>Email address:</label>
        <input className={styles['signature-form__input']} type="email" {...register('email')} />
        {errors.email && <p className={styles['signature-form__error']}>{errors.email.message}</p>}
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__label']}>LinkedIn profile:</label>
        <div className={styles['signature-form__radio-group']}>
          <label className={styles['signature-form__radio-label']}>
            <input type="radio" value="yes" {...register('showLinkedin')} />
            Show
          </label>
          <label className={styles['signature-form__radio-label']}>
            <input type="radio" value="no" {...register('showLinkedin')} />
            Hide
          </label>
        </div>

        {showLinkedin === 'yes' && (
          <>
            <input
              className={styles['signature-form__input']}
              placeholder="linkedin.com/in/..."
              {...register('linkedin')}
            />
            {errors.linkedin && (
              <p className={styles['signature-form__error']}>{errors.linkedin.message}</p>
            )}
          </>
        )}
      </div>

      <div className={styles['signature-form__group']}>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showPhoto')} />
          Show profile photo
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showFacebook')} />
          Facebook icon
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showTwitter')} />
          Twitter icon
        </label>
        <label className={styles['signature-form__checkbox']}>
          <input type="checkbox" {...register('showCompanyLinkedin')} />
          Company LinkedIn icon
        </label>
      </div>

      {showPhoto && (
        <div className={styles['signature-form__group']}>
          <label className={styles['signature-form__label']}>Upload custom photo:</label>
          <input
            className={styles['signature-form__input']}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {photoPreview && (
            <div className={styles['signature-form__image-preview']}>
              <img src={photoPreview} alt="Preview" width="120" />
              <div>
                <button type="button" onClick={handleImageRemove}>Remove</button>
              </div>
            </div>
          )}
        </div>
      )}

      <button className={styles['signature-form__button']} type="submit">
        Generate Signature
      </button>
    </form>
  );
}

export default SignatureForm;
