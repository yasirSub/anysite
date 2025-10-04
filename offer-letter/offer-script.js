// Global variables for customization
let selectedTemplate = 'modern';
let selectedColorScheme = 'blue';
let selectedLayout = 'standard';
let selectedSignatureStyle = 'formal';
let selectedTone = 'professional';
let uploadedLogo = null;

// Template styles
const templates = {
    modern: {
        headerColor: '#667eea',
        accentColor: '#764ba2',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px'
    },
    classic: {
        headerColor: '#8B4513',
        accentColor: '#A0522D',
        fontFamily: 'Times New Roman, serif',
        fontSize: '14px'
    },
    minimal: {
        headerColor: '#666666',
        accentColor: '#999999',
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '14px'
    },
    corporate: {
        headerColor: '#2c3e50',
        accentColor: '#34495e',
        fontFamily: 'Calibri, sans-serif',
        fontSize: '14px'
    }
};

// Color schemes
const colorSchemes = {
    blue: {
        primary: '#667eea',
        secondary: '#764ba2'
    },
    green: {
        primary: '#4CAF50',
        secondary: '#45a049'
    },
    red: {
        primary: '#f44336',
        secondary: '#d32f2f'
    },
    purple: {
        primary: '#9c27b0',
        secondary: '#7b1fa2'
    },
    orange: {
        primary: '#ff9800',
        secondary: '#f57c00'
    },
    teal: {
        primary: '#009688',
        secondary: '#00695c'
    }
};

// Get current date
function getCurrentDate() {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Generate offer letter HTML with custom styling
function generateLetterHTML(formData) {
    const currentDate = getCurrentDate();
    
    // Safe formatting with fallbacks for partial data
    const formattedSalary = formData.salary ? formatCurrency(parseInt(formData.salary)) : '[Salary]';
    const formattedStartDate = formData.startDate ? formatDate(formData.startDate) : '[Start Date]';
    const template = templates[selectedTemplate];
    const colors = colorSchemes[selectedColorScheme];
    const fontFamily = document.getElementById('fontFamily') ? document.getElementById('fontFamily').value : 'Times New Roman';
    const fontSize = document.getElementById('fontSize') ? document.getElementById('fontSize').value + 'px' : '14px';
    
    // Generate logo HTML if uploaded
    const logoHTML = uploadedLogo ? 
        `<div class="letter-logo"><img src="${uploadedLogo}" alt="Company Logo" style="max-height: 60px;"></div>` : '';
    
    // Layout variations
    let layoutClass = '';
    let layoutContent = '';
    
    switch(selectedLayout) {
        case 'compact':
            layoutClass = 'compact-layout';
            layoutContent = generateCompactLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'detailed':
            layoutClass = 'detailed-layout';
            layoutContent = generateDetailedLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'executive':
            layoutClass = 'executive-layout';
            layoutContent = generateExecutiveLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'casual':
            layoutClass = 'casual-layout';
            layoutContent = generateCasualLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'formal':
            layoutClass = 'formal-layout';
            layoutContent = generateFormalLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'creative':
            layoutClass = 'creative-layout';
            layoutContent = generateCreativeLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        case 'minimalist':
            layoutClass = 'minimalist-layout';
            layoutContent = generateMinimalistLayout(formData, currentDate, formattedSalary, formattedStartDate);
            break;
        default:
            layoutClass = 'standard-layout';
            layoutContent = generateStandardLayout(formData, currentDate, formattedSalary, formattedStartDate);
    }
    
    return `
        <style>
            .letter-content {
                font-family: ${fontFamily};
                font-size: ${fontSize};
                line-height: 1.6;
                color: #000;
            }
            .letter-header {
                border-bottom: 3px solid ${colors.primary};
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            .letter-title {
                color: ${colors.primary};
                font-size: 1.8em;
                font-weight: bold;
                text-align: center;
                margin: 0;
            }
            .letter-logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .date {
                text-align: right;
                margin-bottom: 20px;
                font-weight: bold;
                color: ${colors.secondary};
            }
            .recipient {
                margin-bottom: 20px;
                font-weight: bold;
            }
            .salutation {
                margin-bottom: 15px;
                font-weight: bold;
            }
            .body {
                margin-bottom: 20px;
            }
            .body strong {
                color: ${colors.primary};
            }
            .body ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            .body li {
                margin: 5px 0;
            }
            .closing {
                margin-top: 30px;
            }
            .signature {
                margin-top: 40px;
            }
            .compact-layout .body {
                font-size: 0.9em;
                line-height: 1.4;
            }
            .detailed-layout .body {
                font-size: 1.1em;
                line-height: 1.8;
            }
            .detailed-layout .body p {
                margin: 15px 0;
            }
        </style>
        <div class="letter-content ${layoutClass}">
            ${logoHTML}
            <div class="letter-header">
                <h2 class="letter-title">${document.getElementById('letterType') ? document.getElementById('letterType').value.toUpperCase() : 'OFFER LETTER'}</h2>
            </div>
            
            <div class="date">${currentDate}</div>
            
            <div class="recipient">
                ${formData.candidateName || '[Candidate Name]'}<br>
                ${formData.location || '[Location]'}
            </div>
            
            <div class="salutation">Dear ${formData.candidateName ? formData.candidateName.split(' ')[0] : '[Name]'},</div>
            
            <div class="body">
                ${layoutContent}
            </div>
            
            <div class="closing">
                ${generateSignature(formData)}
            </div>
        </div>
    `;
}

// Generate standard layout content with safe fallbacks
function generateStandardLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    
    return `
        <p>We are pleased to offer you the position of <strong>${position}</strong> at ${companyName}. We believe your skills and experience will be a valuable addition to our team.</p>
        
        <p><strong>Position Details:</strong></p>
        <ul>
            <li><strong>Position:</strong> ${position}</li>
            <li><strong>Annual Salary:</strong> ${formattedSalary}</li>
            <li><strong>Start Date:</strong> ${formattedStartDate}</li>
            ${formData.location ? `<li><strong>Location:</strong> ${formData.location}</li>` : ''}
        </ul>
        
        ${formData.benefits ? `
        <p><strong>Benefits Package:</strong></p>
        <p>${formData.benefits}</p>
        ` : ''}
        
        <p>This offer is contingent upon successful completion of any background checks and verification of employment eligibility.</p>
        
        ${formData.additionalNotes ? `
        <p><strong>Additional Terms:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p>Please confirm your acceptance of this offer by signing and returning a copy of this letter within 7 business days.</p>
        
        <p>We look forward to welcoming you to the ${companyName} team!</p>
    `;
}

// Generate compact layout content with safe fallbacks
function generateCompactLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    
    return `
        <p>We are pleased to offer you the position of <strong>${position}</strong> at ${companyName}.</p>
        
        <p><strong>Key Details:</strong> ${position} | ${formattedSalary} | Start: ${formattedStartDate}${formData.location ? ` | Location: ${formData.location}` : ''}</p>
        
        ${formData.benefits ? `<p><strong>Benefits:</strong> ${formData.benefits}</p>` : ''}
        
        ${formData.additionalNotes ? `<p><strong>Additional Terms:</strong> ${formData.additionalNotes}</p>` : ''}
        
        <p>Please confirm acceptance within 7 business days. We look forward to welcoming you to our team!</p>
    `;
}

// Generate detailed layout content with safe fallbacks
function generateDetailedLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    const firstName = candidateName.split(' ')[0];
    
    return `
        <p>Dear ${firstName},</p>
        
        <p>On behalf of ${companyName}, I am delighted to extend a formal offer of employment for the position of <strong>${position}</strong>. After careful consideration of your qualifications and experience, we are confident that you will be an excellent addition to our team.</p>
        
        <p><strong>Position Overview:</strong></p>
        <p>You will be joining us as a ${position}, contributing to our mission and helping us achieve our strategic objectives. This role offers significant opportunities for professional growth and development within our organization.</p>
        
        <p><strong>Compensation and Benefits:</strong></p>
        <ul>
            <li><strong>Annual Salary:</strong> ${formattedSalary}</li>
            <li><strong>Start Date:</strong> ${formattedStartDate}</li>
            ${formData.location ? `<li><strong>Work Location:</strong> ${formData.location}</li>` : ''}
        </ul>
        
        ${formData.benefits ? `
        <p><strong>Comprehensive Benefits Package:</strong></p>
        <p>In addition to your base salary, you will be eligible for our comprehensive benefits package, which includes:</p>
        <p>${formData.benefits}</p>
        ` : ''}
        
        <p><strong>Terms and Conditions:</strong></p>
        <p>This offer is contingent upon successful completion of background verification, reference checks, and confirmation of your legal right to work in the United States. We will provide you with additional details regarding our policies and procedures during your onboarding process.</p>
        
        ${formData.additionalNotes ? `
        <p><strong>Additional Terms and Conditions:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p><strong>Acceptance:</strong></p>
        <p>Please confirm your acceptance of this offer by signing and returning a copy of this letter within seven (7) business days. If you have any questions or need clarification on any aspect of this offer, please do not hesitate to contact our Human Resources department.</p>
        
        <p>We are excited about the possibility of having you join our team and look forward to your positive response. Welcome to ${companyName}!</p>
    `;
}

// Generate executive layout content with safe fallbacks
function generateExecutiveLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    const firstName = candidateName.split(' ')[0];
    
    return `
        <p>Dear ${firstName},</p>
        
        <p>I am delighted to extend a formal offer of employment for the position of <strong>${position}</strong> at ${companyName}. After thorough evaluation of your exceptional qualifications and impressive track record, we are confident that you will make a significant contribution to our organization's continued success.</p>
        
        <p><strong>Executive Summary:</strong></p>
        <p>This executive-level position represents an exciting opportunity to join our leadership team and drive strategic initiatives that will shape the future of ${companyName}. Your expertise and vision align perfectly with our organizational goals and values.</p>
        
        <p><strong>Compensation Package:</strong></p>
        <ul>
            <li><strong>Base Salary:</strong> ${formattedSalary} annually</li>
            <li><strong>Start Date:</strong> ${formattedStartDate}</li>
            <li><strong>Reporting Structure:</strong> Direct reporting to [Executive Team]</li>
            ${formData.location ? `<li><strong>Primary Location:</strong> ${formData.location}</li>` : ''}
            <li><strong>Performance Review:</strong> Quarterly reviews with annual bonus consideration</li>
        </ul>
        
        ${formData.benefits ? `
        <p><strong>Executive Benefits Package:</strong></p>
        <p>As a senior executive, you will be eligible for our comprehensive executive benefits package, including:</p>
        <p>${formData.benefits}</p>
        <ul>
            <li>Executive health and wellness programs</li>
            <li>Professional development and executive coaching</li>
            <li>Flexible work arrangements and remote work options</li>
            <li>Equity participation opportunities</li>
        </ul>
        ` : ''}
        
        <p><strong>Terms and Conditions:</strong></p>
        <p>This offer is subject to standard executive-level background verification, reference checks, and confirmation of employment eligibility. Additional details regarding our executive policies, confidentiality agreements, and non-compete clauses will be provided during the onboarding process.</p>
        
        ${formData.additionalNotes ? `
        <p><strong>Additional Executive Terms:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p><strong>Next Steps:</strong></p>
        <p>Please confirm your acceptance of this executive offer by signing and returning the enclosed agreement within five (5) business days. We will schedule a comprehensive onboarding session with our executive team to ensure a smooth transition into your new role.</p>
        
        <p>We are thrilled about the prospect of welcoming you to our executive leadership team and are confident that together, we will achieve remarkable success. Welcome to ${companyName}!</p>
    `;
}

// Generate casual layout content
function generateCasualLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    const firstName = candidateName.split(' ')[0];
    
    return `
        <p>Hey ${firstName}!</p>
        
        <p>Great news! We'd love to have you join our team as a <strong>${position}</strong> at ${companyName}. We think you'd be a perfect fit!</p>
        
        <p><strong>Here's what we're offering:</strong></p>
        <ul>
            <li><strong>Role:</strong> ${position}</li>
            <li><strong>Salary:</strong> ${formattedSalary} per year</li>
            <li><strong>Start Date:</strong> ${formattedStartDate}</li>
            ${formData.location ? `<li><strong>Location:</strong> ${formData.location}</li>` : ''}
        </ul>
        
        ${formData.benefits ? `
        <p><strong>Perks & Benefits:</strong></p>
        <p>${formData.benefits}</p>
        ` : ''}
        
        <p>If this sounds good to you, just let us know within a week. We're excited to work with you!</p>
        
        ${formData.additionalNotes ? `
        <p><strong>Quick Notes:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p>Looking forward to hearing from you!</p>
    `;
}

// Generate formal layout content
function generateFormalLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    
    return `
        <p>Dear ${candidateName},</p>
        
        <p>It is our pleasure to formally extend an offer of employment for the position of <strong>${position}</strong> with ${companyName}. We are confident that your qualifications and experience will contribute significantly to our organization.</p>
        
        <p><strong>Employment Details:</strong></p>
        <ul>
            <li><strong>Position:</strong> ${position}</li>
            <li><strong>Annual Compensation:</strong> ${formattedSalary}</li>
            <li><strong>Commencement Date:</strong> ${formattedStartDate}</li>
            ${formData.location ? `<li><strong>Work Location:</strong> ${formData.location}</li>` : ''}
        </ul>
        
        ${formData.benefits ? `
        <p><strong>Employee Benefits:</strong></p>
        <p>${formData.benefits}</p>
        ` : ''}
        
        <p>This offer is contingent upon satisfactory completion of background verification and confirmation of employment eligibility.</p>
        
        ${formData.additionalNotes ? `
        <p><strong>Additional Terms:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p>Please indicate your acceptance by returning a signed copy of this letter within five (5) business days.</p>
        
        <p>We anticipate a mutually beneficial professional relationship.</p>
    `;
}

// Generate creative layout content
function generateCreativeLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    const firstName = candidateName.split(' ')[0];
    
    return `
        <p>Dear ${firstName},</p>
        
        <p>🎉 <strong>Congratulations!</strong> We're thrilled to offer you the exciting opportunity to join our innovative team as a <strong>${position}</strong> at ${companyName}!</p>
        
        <p><strong>🌟 What's in it for you:</strong></p>
        <ul>
            <li><strong>🎯 Your Role:</strong> ${position}</li>
            <li><strong>💰 Compensation:</strong> ${formattedSalary} annually</li>
            <li><strong>📅 Start Date:</strong> ${formattedStartDate}</li>
            ${formData.location ? `<li><strong>📍 Location:</strong> ${formData.location}</li>` : ''}
        </ul>
        
        ${formData.benefits ? `
        <p><strong>🎁 Amazing Benefits:</strong></p>
        <p>${formData.benefits}</p>
        ` : ''}
        
        <p><strong>✨ Why you'll love working with us:</strong></p>
        <ul>
            <li>Innovative and collaborative environment</li>
            <li>Opportunities for growth and development</li>
            <li>Flexible work arrangements</li>
            <li>Team-building events and activities</li>
        </ul>
        
        ${formData.additionalNotes ? `
        <p><strong>📝 Additional Information:</strong></p>
        <p>${formData.additionalNotes}</p>
        ` : ''}
        
        <p>🚀 Ready to start this exciting journey? Please confirm your acceptance within 7 days!</p>
        
        <p>We can't wait to welcome you to the ${companyName} family! 🎊</p>
    `;
}

// Generate minimalist layout content
function generateMinimalistLayout(formData, currentDate, formattedSalary, formattedStartDate) {
    const companyName = formData.companyName || '[Company Name]';
    const position = formData.position || '[Position]';
    const candidateName = formData.candidateName || '[Candidate Name]';
    
    return `
        <p>${candidateName},</p>
        
        <p>We are pleased to offer you the position of <strong>${position}</strong> at ${companyName}.</p>
        
        <p><strong>Terms:</strong></p>
        <p>Salary: ${formattedSalary}</p>
        <p>Start: ${formattedStartDate}</p>
        ${formData.location ? `<p>Location: ${formData.location}</p>` : ''}
        
        ${formData.benefits ? `<p>Benefits: ${formData.benefits}</p>` : ''}
        
        ${formData.additionalNotes ? `<p>Notes: ${formData.additionalNotes}</p>` : ''}
        
        <p>Please confirm within 7 days.</p>
        
        <p>Best,<br>${companyName}</p>
    `;
}

// Generate signature based on style and settings
function generateSignature(formData) {
    const hrName = document.getElementById('hrName') ? document.getElementById('hrName').value : 'Sarah Johnson';
    const hrTitle = document.getElementById('hrTitle') ? document.getElementById('hrTitle').value : 'Human Resources Manager';
    const customTitle = document.getElementById('customHrTitle') ? document.getElementById('customHrTitle').value : '';
    const hrEmail = document.getElementById('hrEmail') ? document.getElementById('hrEmail').value : '';
    const hrPhone = document.getElementById('hrPhone') ? document.getElementById('hrPhone').value : '';
    const includeEmail = document.getElementById('includeEmail') ? document.getElementById('includeEmail').checked : true;
    const includePhone = document.getElementById('includePhone') ? document.getElementById('includePhone').checked : false;
    const includeAddress = document.getElementById('includeAddress') ? document.getElementById('includeAddress').checked : false;
    
    const finalTitle = hrTitle === 'custom' && customTitle ? customTitle : hrTitle;
    const companyName = formData.companyName || '[Company Name]';
    
    let signatureHTML = '';
    
    switch(selectedSignatureStyle) {
        case 'formal':
            signatureHTML = `
                <p>Yours sincerely,</p>
                <div class="signature">
                    <p><strong>${hrName}</strong><br>
                    ${finalTitle}<br>
                    ${companyName}</p>
                    ${generateContactInfo(includeEmail, includePhone, includeAddress, hrEmail, hrPhone)}
                </div>
            `;
            break;
            
        case 'friendly':
            signatureHTML = `
                <p>Best regards,</p>
                <div class="signature">
                    <p><strong>${hrName}</strong><br>
                    ${finalTitle}<br>
                    ${companyName}</p>
                    ${generateContactInfo(includeEmail, includePhone, includeAddress, hrEmail, hrPhone)}
                    <p style="margin-top: 15px; font-style: italic; color: #666;">Looking forward to having you on our team!</p>
                </div>
            `;
            break;
            
        case 'executive':
            signatureHTML = `
                <p>Respectfully,</p>
                <div class="signature">
                    <p><strong>${hrName}</strong><br>
                    ${finalTitle}<br>
                    ${companyName}</p>
                    ${generateContactInfo(includeEmail, includePhone, includeAddress, hrEmail, hrPhone)}
                    <p style="margin-top: 10px; font-size: 12px; color: #888;">Direct: ${hrPhone || '[Phone]'} | Email: ${hrEmail || '[Email]'}</p>
                </div>
            `;
            break;
            
        case 'simple':
            signatureHTML = `
                <p>Sincerely,</p>
                <div class="signature">
                    <p>${hrName}<br>
                    ${finalTitle}<br>
                    ${companyName}</p>
                    ${includeEmail && hrEmail ? `<p>${hrEmail}</p>` : ''}
                </div>
            `;
            break;
            
        default:
            signatureHTML = `
                <p>Sincerely,</p>
                <div class="signature">
                    <p>${hrName}<br>
                    ${finalTitle}<br>
                    ${companyName}</p>
                </div>
            `;
    }
    
    return signatureHTML;
}

// Generate contact information based on checkboxes
function generateContactInfo(includeEmail, includePhone, includeAddress, hrEmail, hrPhone) {
    let contactHTML = '';
    
    if (includeEmail && hrEmail) {
        contactHTML += `<p>Email: ${hrEmail}</p>`;
    }
    
    if (includePhone && hrPhone) {
        contactHTML += `<p>Phone: ${hrPhone}</p>`;
    }
    
    if (includeAddress) {
        contactHTML += `<p>Office Address: [Office Address]</p>`;
    }
    
    return contactHTML;
}

// Update live preview with debouncing for better performance
let previewTimeout;
function updateLivePreview() {
    // Clear previous timeout
    clearTimeout(previewTimeout);
    
    // Set new timeout for smooth typing experience
    previewTimeout = setTimeout(() => {
        const form = document.getElementById('offerForm');
        const formData = new FormData(form);
        
        // Convert FormData to object
        const data = {};
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Check if we have any content to show preview
        const hasAnyContent = Object.values(data).some(value => value && value.trim() !== '');
        
        if (hasAnyContent) {
            // Generate and display letter (even with partial data)
            const letterHTML = generateLetterHTML(data);
            document.getElementById('letterPreview').innerHTML = letterHTML;
        } else {
            // Show placeholder
            showPlaceholder();
        }
    }, 100); // 100ms delay for smooth typing
}

// Show placeholder
function showPlaceholder() {
    document.getElementById('letterPreview').innerHTML = `
        <div class="default-preview">
            <div class="preview-placeholder">
                <div class="placeholder-icon">📄</div>
                <h4>Live Preview</h4>
                <p>Start filling out the form to see your offer letter appear here in real-time!</p>
                <div class="preview-features">
                    <div class="feature-item">✅ Template selection</div>
                    <div class="feature-item">✅ Color schemes</div>
                    <div class="feature-item">✅ Logo upload</div>
                    <div class="feature-item">✅ Font customization</div>
                    <div class="feature-item">✅ Layout options</div>
                </div>
            </div>
        </div>
    `;
}

// Preview offer letter (legacy function for button)
function previewOffer() {
    updateLivePreview();
}

// Toggle preview visibility
function togglePreview() {
    const previewSection = document.getElementById('previewSection');
    const isHidden = previewSection.style.display === 'none';
    
    if (isHidden) {
        previewSection.style.display = 'block';
        updateLivePreview();
    } else {
        previewSection.style.display = 'none';
    }
}

// Generate PDF with enhanced formatting
function generateOffer() {
    const form = document.getElementById('offerForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['companyName', 'candidateName', 'position', 'salary', 'startDate'];
    let isValid = true;
    
    for (const field of requiredFields) {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            document.getElementById(field).focus();
            isValid = false;
            break;
        }
    }
    
    if (!isValid) return;
    
    // Convert FormData to object
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Get current settings
    const fontFamily = document.getElementById('fontFamily') ? document.getElementById('fontFamily').value : 'Times New Roman';
    const fontSize = document.getElementById('fontSize') ? document.getElementById('fontSize').value + 'px' : '14px';
    const colors = colorSchemes[selectedColorScheme];
    const letterTitle = document.getElementById('letterType') ? document.getElementById('letterType').value.toUpperCase() : 'OFFER LETTER';
    
    // Generate letter HTML
    const letterHTML = generateLetterHTML(data);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${letterTitle} - ${data.candidateName}</title>
            <meta charset="UTF-8">
            <style>
                * {
                    box-sizing: border-box;
                }
                body {
                    font-family: ${fontFamily}, serif;
                    font-size: ${fontSize};
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    color: #000;
                    background: #fff;
                }
                .letter-header {
                    border-bottom: 3px solid ${colors.primary};
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                h2 {
                    text-align: center;
                    margin: 0;
                    color: ${colors.primary};
                    font-size: 1.8em;
                    font-weight: bold;
                }
                .letter-logo {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .letter-logo img {
                    max-height: 60px;
                    max-width: 200px;
                }
                .date {
                    text-align: right;
                    margin-bottom: 20px;
                    font-weight: bold;
                    color: ${colors.secondary};
                }
                .recipient {
                    margin-bottom: 20px;
                    font-weight: bold;
                }
                .salutation {
                    margin-bottom: 15px;
                    font-weight: bold;
                }
                .body {
                    margin-bottom: 20px;
                }
                .body strong {
                    color: ${colors.primary};
                }
                .body ul {
                    margin: 10px 0;
                    padding-left: 20px;
                }
                .body li {
                    margin: 5px 0;
                }
                .closing {
                    margin-top: 30px;
                }
                .signature {
                    margin-top: 40px;
                }
                .compact-layout .body {
                    font-size: 0.9em;
                    line-height: 1.4;
                }
                .detailed-layout .body {
                    font-size: 1.1em;
                    line-height: 1.8;
                }
                .detailed-layout .body p {
                    margin: 15px 0;
                }
                .executive-layout .body {
                    font-size: 1.05em;
                    line-height: 1.7;
                }
                .executive-layout .body p {
                    margin: 12px 0;
                }
                .casual-layout .body {
                    font-size: 1em;
                    line-height: 1.5;
                }
                .formal-layout .body {
                    font-size: 1em;
                    line-height: 1.6;
                }
                .creative-layout .body {
                    font-size: 1em;
                    line-height: 1.6;
                }
                .minimalist-layout .body {
                    font-size: 0.95em;
                    line-height: 1.4;
                }
                .minimalist-layout .body p {
                    margin: 8px 0;
                }
                
                @media print {
                    body { 
                        margin: 0; 
                        padding: 20px; 
                        font-size: 12px;
                    }
                    @page { 
                        margin: 0.75in; 
                        size: A4;
                    }
                    .letter-header {
                        page-break-inside: avoid;
                    }
                    .signature {
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            ${letterHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    setTimeout(() => {
        printWindow.print();
    }, 800);
}

// Go back to features page
function goBack() {
    window.location.href = '../features.html';
}

// Auto-fill current date as start date (30 days from now)
document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        startDateInput.value = futureDate.toISOString().split('T')[0];
    }
});

// Template selection
function selectTemplate(template) {
    selectedTemplate = template;
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-template="${template}"]`).classList.add('active');
    updateLivePreview(); // Auto-update preview
}

// Color scheme selection
function selectColorScheme(scheme) {
    selectedColorScheme = scheme;
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-scheme="${scheme}"]`).classList.add('active');
    updateLivePreview(); // Auto-update preview
}

// Layout selection
function selectLayout(layout) {
    selectedLayout = layout;
    document.querySelectorAll('.layout-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-layout="${layout}"]`).classList.add('active');
    updateLivePreview(); // Auto-update preview
}

// Signature style selection
function selectSignatureStyle(style) {
    selectedSignatureStyle = style;
    document.querySelectorAll('.signature-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-style="${style}"]`).classList.add('active');
    updateLivePreview(); // Auto-update preview
}

// Tone selection
function selectTone(tone) {
    selectedTone = tone;
    document.querySelectorAll('.tone-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tone="${tone}"]`).classList.add('active');
    updateLivePreview(); // Auto-update preview
}

// Set letter type
function setLetterType(type) {
    document.getElementById('letterType').value = type;
    updateLivePreview(); // Auto-update preview
}

// Template data
const templates = {
    'software-engineer': {
        letterType: 'Job Offer',
        companyName: 'TechCorp Solutions',
        candidateName: 'Alex Johnson',
        position: 'Senior Software Engineer',
        salary: '95000',
        startDate: '',
        location: 'San Francisco, CA',
        benefits: 'Health insurance, 401k matching, flexible PTO, professional development budget, gym membership',
        additionalNotes: 'This role involves working with our cutting-edge AI team on innovative projects.',
        hrName: 'Jennifer Martinez',
        hrTitle: 'Human Resources Manager',
        hrEmail: 'jennifer.martinez@techcorp.com',
        hrPhone: '(415) 555-0123',
        layout: 'standard',
        colorScheme: 'blue',
        signatureStyle: 'professional'
    },
    'marketing-manager': {
        letterType: 'Offer Letter',
        companyName: 'Growth Marketing Inc',
        candidateName: 'Sarah Williams',
        position: 'Marketing Manager',
        salary: '78000',
        startDate: '',
        location: 'New York, NY',
        benefits: 'Health insurance, dental, vision, 401k, unlimited vacation, work from home flexibility',
        additionalNotes: 'You will lead our digital marketing campaigns and manage a team of 5 marketing specialists.',
        hrName: 'David Thompson',
        hrTitle: 'Senior HR Specialist',
        hrEmail: 'david.thompson@growthmarketing.com',
        hrPhone: '(212) 555-0456',
        layout: 'detailed',
        colorScheme: 'green',
        signatureStyle: 'friendly'
    },
    'sales-rep': {
        letterType: 'Sales Offer',
        companyName: 'Enterprise Sales Co',
        candidateName: 'Michael Chen',
        position: 'Senior Sales Representative',
        salary: '65000',
        startDate: '',
        location: 'Chicago, IL',
        benefits: 'Base salary plus commission, health insurance, company car, expense account, performance bonuses',
        additionalNotes: 'This position includes a competitive commission structure with unlimited earning potential.',
        hrName: 'Lisa Rodriguez',
        hrTitle: 'HR Business Partner',
        hrEmail: 'lisa.rodriguez@enterprisesales.com',
        hrPhone: '(312) 555-0789',
        layout: 'casual',
        colorScheme: 'orange',
        signatureStyle: 'enthusiastic'
    },
    'designer': {
        letterType: 'Creative Offer',
        companyName: 'Design Studio Pro',
        candidateName: 'Emma Rodriguez',
        position: 'UX/UI Designer',
        salary: '82000',
        startDate: '',
        location: 'Austin, TX',
        benefits: 'Health insurance, creative tools budget, flexible hours, design conference attendance, stock options',
        additionalNotes: 'Join our award-winning design team and work on projects for Fortune 500 clients.',
        hrName: 'Marcus Johnson',
        hrTitle: 'People Operations Manager',
        hrEmail: 'marcus.johnson@designstudiopro.com',
        hrPhone: '(512) 555-0321',
        layout: 'creative',
        colorScheme: 'purple',
        signatureStyle: 'creative'
    },
    'intern': {
        letterType: 'Internship Offer',
        companyName: 'StartupXYZ',
        candidateName: 'David Kim',
        position: 'Software Development Intern',
        salary: '3000',
        startDate: '',
        location: 'Seattle, WA',
        benefits: 'Learning opportunities, mentorship program, free lunch, networking events, potential full-time offer',
        additionalNotes: 'This is a 12-week summer internship with the possibility of extending to a full-time position.',
        hrName: 'Rachel Green',
        hrTitle: 'Talent Acquisition Specialist',
        hrEmail: 'rachel.green@startupxyz.com',
        hrPhone: '(206) 555-0654',
        layout: 'friendly',
        colorScheme: 'teal',
        signatureStyle: 'friendly'
    },
    'contractor': {
        letterType: 'Contract Agreement',
        companyName: 'Consulting Partners LLC',
        candidateName: 'Lisa Thompson',
        position: 'Senior Consultant',
        salary: '120000',
        startDate: '',
        location: 'Remote',
        benefits: 'Project-based compensation, flexible schedule, expense reimbursement, professional development',
        additionalNotes: 'This is a 6-month contract with potential for extension based on project success.',
        hrName: 'Amanda Foster',
        hrTitle: 'Contract Management Specialist',
        hrEmail: 'amanda.foster@consultingpartners.com',
        hrPhone: '(555) 555-0987',
        layout: 'formal',
        colorScheme: 'blue',
        signatureStyle: 'formal'
    },
    'executive': {
        letterType: 'Executive Offer',
        companyName: 'Global Enterprises Inc',
        candidateName: 'Robert Anderson',
        position: 'Chief Technology Officer',
        salary: '180000',
        startDate: '',
        location: 'Boston, MA',
        benefits: 'Executive health plan, equity package, executive assistant, company car, relocation assistance',
        additionalNotes: 'This executive position includes stock options and performance-based bonuses.',
        hrName: 'Victoria Chen',
        hrTitle: 'Chief People Officer',
        hrEmail: 'victoria.chen@globalenterprises.com',
        hrPhone: '(617) 555-0246',
        layout: 'executive',
        colorScheme: 'purple',
        signatureStyle: 'executive'
    },
    'remote': {
        letterType: 'Remote Work Offer',
        companyName: 'RemoteFirst Company',
        candidateName: 'Jennifer Davis',
        position: 'Product Manager',
        salary: '88000',
        startDate: '',
        location: 'Remote (Anywhere)',
        benefits: 'Health insurance, home office stipend, flexible hours, annual company retreat, unlimited PTO',
        additionalNotes: 'This is a fully remote position with quarterly team meetups in different cities.',
        hrName: 'Kevin Park',
        hrTitle: 'Remote Work Coordinator',
        hrEmail: 'kevin.park@remotefirst.com',
        hrPhone: '(555) 555-0135',
        layout: 'modern',
        colorScheme: 'green',
        signatureStyle: 'friendly'
    },
    'promotion': {
        letterType: 'Promotion Letter',
        companyName: 'Your Current Company',
        candidateName: 'Current Employee',
        position: 'Senior Manager',
        salary: '75000',
        startDate: '',
        location: 'Current Location',
        benefits: 'Increased benefits package, management training, leadership development, additional PTO',
        additionalNotes: 'Congratulations on your promotion! You will now lead a team of 8 employees.',
        hrName: 'Your HR Manager',
        hrTitle: 'Human Resources Manager',
        hrEmail: 'hr@yourcompany.com',
        hrPhone: '(555) 555-0000',
        layout: 'detailed',
        colorScheme: 'blue',
        signatureStyle: 'professional'
    },
    'welcome': {
        letterType: 'Welcome Letter',
        companyName: 'Your New Company',
        candidateName: 'New Employee',
        position: 'Your New Role',
        salary: '0',
        startDate: '',
        location: 'Office Location',
        benefits: 'Welcome to our team! We are excited to have you join us.',
        additionalNotes: 'This letter welcomes you to our company and outlines your first week schedule.',
        hrName: 'Your HR Team',
        hrTitle: 'Human Resources Team',
        hrEmail: 'hr@yournewcompany.com',
        hrPhone: '(555) 555-0000',
        layout: 'casual',
        colorScheme: 'green',
        signatureStyle: 'friendly'
    },
    'contract-renewal': {
        letterType: 'Contract Renewal',
        companyName: 'Your Company',
        candidateName: 'Contractor Name',
        position: 'Your Position',
        salary: '0',
        startDate: '',
        location: 'Work Location',
        benefits: 'Contract extension with updated terms and conditions.',
        additionalNotes: 'We are pleased to extend your contract for another year with improved terms.',
        hrName: 'Your HR Manager',
        hrTitle: 'Contract Administrator',
        hrEmail: 'contracts@yourcompany.com',
        hrPhone: '(555) 555-0000',
        layout: 'formal',
        colorScheme: 'blue',
        signatureStyle: 'professional'
    }
};

// Load template
function loadTemplate(templateKey) {
    if (templateKey === 'clear') {
        clearAllFields();
        return;
    }
    
    const template = templates[templateKey];
    if (!template) return;
    
    // Set form fields
    document.getElementById('letterType').value = template.letterType;
    document.getElementById('companyName').value = template.companyName;
    document.getElementById('candidateName').value = template.candidateName;
    document.getElementById('position').value = template.position;
    document.getElementById('salary').value = template.salary;
    document.getElementById('location').value = template.location;
    document.getElementById('benefits').value = template.benefits;
    document.getElementById('additionalNotes').value = template.additionalNotes;
    
    // Set HR fields
    if (template.hrName) document.getElementById('hrName').value = template.hrName;
    if (template.hrTitle) document.getElementById('hrTitle').value = template.hrTitle;
    if (template.hrEmail) document.getElementById('hrEmail').value = template.hrEmail;
    if (template.hrPhone) document.getElementById('hrPhone').value = template.hrPhone;
    
    // Set start date to 30 days from now
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    document.getElementById('startDate').value = futureDate.toISOString().split('T')[0];
    
    // Set styling options
    if (template.layout) {
        selectLayout(template.layout);
    }
    if (template.colorScheme) {
        selectColorScheme(template.colorScheme);
    }
    if (template.signatureStyle) {
        selectSignatureStyle(template.signatureStyle);
    }
    
    // Update preview
    updateLivePreview();
    
    // Show success message
    showTemplateLoadedMessage(templateKey);
}

// Clear all fields
function clearAllFields() {
    document.getElementById('letterType').value = 'Offer Letter';
    document.getElementById('companyName').value = '';
    document.getElementById('candidateName').value = '';
    document.getElementById('position').value = '';
    document.getElementById('salary').value = '';
    document.getElementById('location').value = '';
    document.getElementById('benefits').value = '';
    document.getElementById('additionalNotes').value = '';
    
    // Reset start date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    document.getElementById('startDate').value = futureDate.toISOString().split('T')[0];
    
    // Reset to defaults
    selectLayout('standard');
    selectColorScheme('blue');
    selectSignatureStyle('formal');
    
    updateLivePreview();
    showTemplateLoadedMessage('clear');
}

// Show template loaded message
function showTemplateLoadedMessage(templateKey) {
    const message = templateKey === 'clear' ? 'All fields cleared!' : 'Template loaded successfully!';
    
    // Create temporary message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        animation: slideIn 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Logo upload functionality
function uploadLogo(file) {
    if (file && file.type.startsWith('image/')) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            alert('File size must be less than 2MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedLogo = e.target.result;
            document.getElementById('logoPreview').style.display = 'block';
            document.getElementById('logoImage').src = uploadedLogo;
            document.getElementById('uploadArea').style.display = 'none';
            updateLivePreview(); // Auto-update preview
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file');
    }
}

// Remove logo
function removeLogo() {
    uploadedLogo = null;
    document.getElementById('logoPreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('logoUpload').value = '';
    updateLivePreview(); // Auto-update preview
}

// Add form validation on input
document.addEventListener('DOMContentLoaded', function() {
    // Template selection event listeners
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            selectTemplate(this.dataset.template);
        });
    });
    
    // Color scheme selection event listeners
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            selectColorScheme(this.dataset.scheme);
        });
    });
    
    // Layout selection event listeners
    document.querySelectorAll('.layout-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectLayout(this.dataset.layout);
        });
    });
    
    // Signature style selection event listeners
    document.querySelectorAll('.signature-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectSignatureStyle(this.dataset.style);
        });
    });
    
    // Tone selection event listeners
    document.querySelectorAll('.tone-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectTone(this.dataset.tone);
        });
    });
    
    // Custom HR title handling
    const hrTitleSelect = document.getElementById('hrTitle');
    const customHrTitleInput = document.getElementById('customHrTitle');
    
    if (hrTitleSelect && customHrTitleInput) {
        hrTitleSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customHrTitleInput.style.display = 'block';
            } else {
                customHrTitleInput.style.display = 'none';
            }
            updateLivePreview();
        });
    }
    
    // Logo upload event listeners
    const uploadArea = document.getElementById('uploadArea');
    const logoUpload = document.getElementById('logoUpload');
    
    uploadArea.addEventListener('click', function() {
        logoUpload.click();
    });
    
    logoUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            uploadLogo(this.files[0]);
        }
    });
    
    // Drag and drop for logo upload
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#667eea';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#555555';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#555555';
        if (e.dataTransfer.files.length > 0) {
            uploadLogo(e.dataTransfer.files[0]);
        }
    });
    
    // Form validation and live preview updates
    const form = document.getElementById('offerForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#555555';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 68, 68)') {
                this.style.borderColor = '#555555';
            }
            // Auto-update preview on input change
            updateLivePreview();
        });
        
        input.addEventListener('change', function() {
            // Auto-update preview on select/date changes
            updateLivePreview();
        });
    });
    
    // Initialize with placeholder
    showPlaceholder();
});
