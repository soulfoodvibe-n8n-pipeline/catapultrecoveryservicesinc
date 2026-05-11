"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function IntakePage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    assistance_type: "Housing Assistance",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase
        .from('intake_submissions')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            assistance_type: formData.assistance_type,
            description: formData.description
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setErrorMsg(err.message || "Something went wrong. Please try calling us instead.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '800px', margin: '0 auto 64px auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Get <span className="ascension-text">Help Now</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--foreground-muted)', lineHeight: 1.6 }}>
            You don't have to face this alone. If you or a loved one is struggling with displacement, substance abuse, or mental health issues, reach out to our team today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Intake Form */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Confidential Intake Form</h2>
            {submitted ? (
              <div style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--secondary)', borderRadius: '12px', color: '#60A5FA', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px' }}>Message Received</h3>
                <p>Thank you for reaching out. A member of the Catapult team will contact you securely within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errorMsg && (
                  <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#EF4444', borderRadius: '8px' }}>
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--foreground-muted)' }}>Name (Optional)</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--foreground-muted)' }}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="(904) 555-0199" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--foreground-muted)' }}>What type of assistance is needed?</label>
                  <select name="assistance_type" value={formData.assistance_type} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: '#111', color: 'white', fontSize: '1rem' }}>
                    <option value="Housing Assistance">Housing Assistance</option>
                    <option value="Substance Abuse Recovery">Substance Abuse Recovery</option>
                    <option value="Mental Health Counseling">Mental Health Counseling</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'var(--foreground-muted)' }}>Briefly describe the situation</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="How can we help?" style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'rgba(0,0,0,0.2)', color: 'white', fontSize: '1rem', fontFamily: 'inherit' }}></textarea>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '16px', width: '100%', opacity: isLoading ? 0.7 : 1 }}>
                  {isLoading ? 'Sending securely...' : 'Request Assistance'}
                </button>
              </form>
            )}
          </div>

          {/* Emergency Contacts */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Immediate Resources</h2>
            <p style={{ color: 'var(--foreground-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              If you are experiencing a medical emergency, a severe mental health crisis, or are in immediate danger, please dial 911.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>National Suicide Prevention Lifeline</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>Dial 988</p>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--secondary)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>SAMHSA National Helpline</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>1-800-662-HELP</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground-muted)', marginTop: '8px' }}>Treatment routing and information service</p>
              </div>
              
              <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Jacksonville Local Hotlines</h3>
                <p style={{ fontSize: '1rem', color: 'var(--foreground-muted)' }}>Duval County Crisis: <span style={{ color: 'white', fontWeight: 600 }}>904-632-0600</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
