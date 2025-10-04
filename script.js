// Website search functionality
const searchableContent = [
    {
        title: "Offer Letter Generator",
        description: "Create professional offer letters with customizable templates and company branding.",
        keywords: ["offer", "letter", "job", "employment", "hiring", "recruitment", "professional", "template", "company"],
        type: "Tool",
        action: () => window.location.href = 'offer-letter/index.html'
    },
    {
        title: "Features & Tools",
        description: "Explore all available features and tools on the website.",
        keywords: ["features", "tools", "options", "menu", "navigation"],
        type: "Page",
        action: () => window.location.href = 'features.html'
    },
    {
        title: "AnySite Home",
        description: "Main homepage with search functionality and navigation.",
        keywords: ["home", "main", "start", "welcome", "search"],
        type: "Page",
        action: () => window.location.href = 'index.html'
    }
];

function goToFeatures() {
    window.location.href = 'features.html';
}

function goToHome() {
    window.location.href = 'index.html';
}

function openOfferLetter() {
    window.location.href = 'offer-letter/index.html';
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    const searchButton = document.querySelector('.search-button');
    
    // Add loading animation
    searchButton.innerHTML = '⏳ Searching...';
    searchButton.style.opacity = '0.7';
    
    setTimeout(() => {
        if (!searchTerm) {
            resultsContainer.innerHTML = '<div class="no-results">Please enter a search term</div>';
            searchButton.innerHTML = '🔍 Search';
            searchButton.style.opacity = '1';
            return;
        }
        
        // Search through content
        const results = searchableContent.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descMatch = item.description.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
            
            return titleMatch || descMatch || keywordMatch;
        });
        
        // Display results with animation
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div style="font-size: 3rem; margin-bottom: 15px;">🔍</div>
                    <div>No results found for "${searchTerm}"</div>
                    <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Try different keywords or check spelling</div>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map((result, index) => `
                <div class="search-result-item" onclick="${result.action.toString()}" style="animation-delay: ${index * 0.1}s;">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-description">${result.description}</div>
                    <span class="search-result-type">${result.type}</span>
                </div>
            `).join('');
        }
        
        // Reset button
        searchButton.innerHTML = '🔍 Search';
        searchButton.style.opacity = '1';
    }, 300);
}

// Dropdown functionality

// Add Enter key support for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    
    // Real-time search with dropdown
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase().trim();
        console.log('Input event triggered, value:', value);
        
        if (value.length > 0) {
            showDropdown(value);
            // Add subtle glow effect when typing
            this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
            hideDropdown();
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // Show dropdown on focus if there's text
    searchInput.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
        const value = this.value.toLowerCase().trim();
        if (value.length > 0) {
            showDropdown(value);
        }
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            hideDropdown();
            searchInput.style.transform = 'translateY(0)';
            searchInput.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // Add welcome message on page load
    document.getElementById('searchResults').innerHTML = `
        <div class="no-results">
            <div style="font-size: 2rem; margin-bottom: 15px;">🎯</div>
            <div>Welcome to AnySite Search!</div>
            <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.7;">Start typing to see instant results!</div>
        </div>
    `;
});

function showDropdown(searchTerm) {
    const dropdown = document.getElementById('searchDropdown');
    console.log('showDropdown called with:', searchTerm);
    
    // Search through content
    const results = searchableContent.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const descMatch = item.description.toLowerCase().includes(searchTerm);
        const keywordMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        
        return titleMatch || descMatch || keywordMatch;
    });
    
    console.log('Search results:', results);
    
    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="dropdown-no-results">
                <span class="emoji">🔍</span>
                No results found for "${searchTerm}"
            </div>
        `;
    } else {
        dropdown.innerHTML = results.map((result, index) => `
            <div class="dropdown-item" onclick="navigateTo('${getResultUrl(result)}')">
                <div class="dropdown-item-title">${result.title}</div>
                <div class="dropdown-item-description">${result.description}</div>
                <span class="dropdown-item-type">${result.type}</span>
            </div>
        `).join('');
    }
    
    dropdown.classList.add('show');
    console.log('Dropdown shown with class:', dropdown.className);
}

function navigateTo(url) {
    console.log('Navigating to:', url);
    if (url && url !== '#') {
        window.location.href = url;
    }
}

function hideDropdown() {
    const dropdown = document.getElementById('searchDropdown');
    dropdown.classList.remove('show');
}

function getResultUrl(result) {
    // Extract URL from the action function
    if (result.title === "Offer Letter Generator") {
        return 'offer-letter/index.html';
    } else if (result.title === "Features & Tools") {
        return 'features.html';
    } else if (result.title === "AnySite Home") {
        return 'index.html';
    }
    return '#';
}