function loadNavbar() {
    const navHTML = `
        <nav style="background: #333; padding: 10px; margin-bottom: 20px; font-family: sans-serif;">
            <a href="index.html" style="color: white; margin-right: 15px; text-decoration: none;">Home</a>
            <a href="routines.html" style="color: white; margin-right: 15px; text-decoration: none;">Routines (Plan)</a>
            <a href="logger.html" style="color: white; margin-right: 15px; text-decoration: none;">Logger (Track)</a>
            <a href="stats.html" style="color: white; text-decoration: none;">Stats (View)</a>
        </nav>
    `;
    
    // Inject the HTML into the placeholder div
    document.getElementById('navbar-placeholder').innerHTML = navHTML;
}

// Run the function as soon as the page loads
document.addEventListener('DOMContentLoaded', loadNavbar);


