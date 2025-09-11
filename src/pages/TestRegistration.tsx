import React, { useState } from 'react';
import { authApi } from '@/services/api/auth.api';

const TestRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '테스트유저',
    email: 'test@example.com',
    password: 'test1234',
    address: '서울시 강남구'
  });
  
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const testRegistration = async () => {
    setLoading(true);
    setResult('회원가입 테스트 시작...\n');
    
    try {
      const response = await authApi.register(formData);
      setResult(prev => prev + `✅ 성공!\n응답: ${JSON.stringify(response, null, 2)}`);
    } catch (error: any) {
      console.error('Registration test error:', error);
      setResult(prev => prev + `❌ 실패: ${error.message}\n상세: ${JSON.stringify(error.response?.data, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>React 회원가입 테스트</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            이름: 
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            이메일: 
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            비밀번호: 
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>
            주소: 
            <input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </label>
        </div>
        
        <button 
          onClick={testRegistration}
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '테스트 중...' : '회원가입 테스트'}
        </button>
      </div>
      
      <div>
        <h3>결과:</h3>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          minHeight: '200px'
        }}>
          {result || '테스트 결과가 여기에 표시됩니다.'}
        </pre>
      </div>
    </div>
  );
};

export default TestRegistration;