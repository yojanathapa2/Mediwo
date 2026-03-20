
const API_URL = process.env.VITE_API_URL || 'http://127.0.0.1:8000';

const Upload = () => {
  const { enqueueSnackbar } = useSnackbar();
  
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    patientName: '',
    reportType: '',
    image: null,
    imagePreview: null
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setError('');
      
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
      enqueueSnackbar('Image selected', { variant: 'success' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.title || !formData.image) {
      setError('Please fill in title and select an image');
      return;
    }

    const data = new FormData();
    data.append('file', formData.image);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('patientName', formData.patientName || user?.name || 'Unknown');
    data.append('reportType', formData.reportType || 'General');
    data.append('uploadedBy', user?.username || 'Unknown');

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: '',
          description: '',
          date: '',
          patientName: '',
          reportType: '',
          image: null,
          imagePreview: null
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to upload report. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
        <div className="text-4xl mb-4">📋</div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Upload moved to Profile</h1>
        <p className="text-sm text-slate-400 mb-5">
          In the Claude UI, medical report upload is inside the patient profile.
        </p>
        <button
          onClick={() => setPage("profile")}
          className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
          style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}