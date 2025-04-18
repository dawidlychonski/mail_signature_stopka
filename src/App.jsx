import React, { useState } from 'react';
import SignatureForm from './Components/SignatureForm';
import FooterPreview from './Components/FooterPreview';

function App() {
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <SignatureForm onSubmit={handleSubmit} />
      {formData && <FooterPreview data={formData} />}
    </div>
  );
}

export default App;