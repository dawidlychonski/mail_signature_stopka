import React, { useEffect } from 'react';
import { useSignature } from '../context/SignatureContext';
import { useNavigate } from 'react-router-dom';

function FooterPreview({ data }) {
  const { signatureData } = useSignature();
  const navigate = useNavigate();

  if (!signatureData) {
    navigate('/');
    return null;
  }

  const {
    name,
    title,
    phone,
    email,
    linkedin,
    showLinkedin,
    showPhoto,
    showFacebook,
    showTwitter,
    showCompanyLinkedin,
    photo,
  } = signatureData;

  
  // Stylowanie imienia i nazwiska – zmienia się w zależności od tego, czy pokazujemy zdjęcie pracownika czy ukrywamy
  // Jak ukrywamy photo to imię i nazwisko ma mniejszy margin-top, żeby było równo z prawą kolumną
  const nameStyle = `letter-spacing: 1px; font-weight: bold; font-size: 18px; color: #04CFD1; margin: ${showPhoto ? '20px 0 0 0' : '10px 0 0 0'};`;

  // Sekcja zdjęcia pracownika – jeśli showPhoto = false, pomijamy cały wiersz <tr>
  // Jeśli są problemy ze zdjęciem, to użyć tego fragmentu kodu
  // const photoRow = showPhoto
  //   ? `<tr><td><img src="https://thehouseofcode.com/images/team/team2.png" alt="" width="120" height="109"></td></tr>`
  //   : '';
  const photoRow = showPhoto
    ? `<tr><td><img src="${photo || 'https://thehouseofcode.com/images/team/team2.png'}" alt="User Photo" style="max-height: 109px; width: auto; border-radius: 4px;" /></td></tr>`
    : '';

  // Sekcja linku do LinkedIna – renderowana tylko jeśli zaznaczono opcję i podano adres 
  // (To jest prawa kolumna gdzie podaje się numer tel oraz email)
  const linkedinRow =
    showLinkedin === 'yes' && linkedin.trim() !== ''
      ? `
        <tr>
          <td style="padding-bottom: 10px;">
            <img src="https://thehouseofcode.com/images/team/mail_footer/people.png" alt="LinkedIn" width="16" height="16">
          </td>
          <td style="padding-bottom: 10px;">
            <a href="https://${linkedin}" target="_blank" style="font-size: 14px; text-decoration: none; color: #232323; margin-left: 10px;">${linkedin}</a>
          </td>
        </tr>
      `
      : '';

  // Dynamiczne budowanie tablicy aktywnych ikon social media
  // Wybrane ikonki zawsze zajmują miejsce od 1 do 3
  // W przypadku wybrania jednej ikonki - zawsze zajmie miejsce numer 1 nawet jeśli domyślnie zajmuje miejsce 3 np: linkedin
  // W przypadku wybrania tylko dwóch ikonek - zawsze zajmą miejsce 1 i 2
  const icons = [];
  if (showCompanyLinkedin) {
    icons.push(
      `<a href="https://www.linkedin.com/company/19011567/" target="_blank">
        <img src="https://thehouseofcode.com/images/team/mail_footer/linkedin.png" alt="LinkedIn" width="25" height="25">
      </a>`
    );
  }
  if (showTwitter) {
    icons.push(
      `<a href="https://twitter.com/TheHouseOfCode" target="_blank">
        <img src="https://thehouseofcode.com/images/team/mail_footer/twitter.png" alt="Twitter" width="25" height="25">
      </a>`
    );
  }
  if (showFacebook) {
    icons.push(
      `<a href="https://www.facebook.com/THOCTheHouseOfCode/" target="_blank">
        <img src="https://thehouseofcode.com/images/team/mail_footer/fb.png" alt="Facebook" width="25" height="25">
      </a>`
    );
  }

  // dynamiczne <td>
  // Renderujemy dokładnie 3 komórki <td> na ikonki, z dynamicznymi paddingami:
  // - 1. ikona ma padding-left: 20px
  // - 2. ikona ma padding-left: 30px
  // - 3. ikona NIE MA padding-left
  const socialIcons = [0, 1, 2].map((i) => {
    const icon = icons[i] || '';
    let baseStyle = '';

    if (i === 0) {
      baseStyle = 'padding-top: 10px; padding-left: 20px;';
    } else if (i === 1) {
      baseStyle = 'padding-top: 12px; padding-left: 30px; padding-right: 30px; width: 25px; height: 25px;';
    } else if (i === 2) {
      baseStyle = 'padding-top: 12px; padding-right: 30px; width: 25px; height: 25px;';
    }

    return `<td style="${baseStyle}">${icon}</td>`;
  }).join('');

  // Składamy cały kod HTML stopki jako string (inline CSS, zgodne z klientami poczty)
  const html = `
    <html>
      <body>
        <table style="font-family: Arial; margin: 10px 20px; max-width: 500px; width: 100%; border-spacing: 0;">
          <tr>
            <td colspan="2">
              <div style="max-width: 18px; border: 1px solid black; margin: 20px 0;"></div>
              <span style="font-size: 14px; font-weight: bold;">Best regards,</span>
            </td>
          </tr>
          <tr>
            <td valign="top" style="width: 250px; padding-right: 20px; padding-top: 20px;">
              <table>
                ${photoRow}
                <tr>
                  <td>
                    <p style="${nameStyle}">${name}</p>
                    <p style="color: #333333; font-size: 14px; margin: 5px 0 0 0;">${title}</p>
                  </td>
                </tr>
              </table>
            </td>
            <td valign="top" style="padding-left: 20px; padding-top: 30px; border-left: 2px solid #dcdcdc;">
              <table style="height: 57px;">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <img src="https://thehouseofcode.com/images/team/mail_footer/phone.png" alt="Phone" width="16" height="16">
                  </td>
                  <td style="padding-bottom: 10px;">
                    <a href="tel:${phone}" style="font-size: 14px; text-decoration: none; color: #232323; margin-left: 10px;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <img src="https://thehouseofcode.com/images/team/mail_footer/email.png" alt="Email" width="16" height="16">
                  </td>
                  <td style="padding-bottom: 10px;">
                    <a href="mailto:${email}" style="font-size: 14px; text-decoration: none; color: #232323; margin-left: 10px;">${email}</a>
                  </td>
                </tr>
                ${linkedinRow}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 20px;">
              <a href="https://thehouseofcode.com" target="_blank">
                <img src="https://thehouseofcode.com/images/team/mail_footer/logo.png" alt="Logo" width="197" height="27">
              </a>
            </td>
            <td valign="top" style="width: 250px; padding-right: 20px; padding-top: 10px;">
              <table><tr>${socialIcons}</tr></table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default FooterPreview;
