document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const data = await response.json();
        const imageUrl = data.imageUrl; // Corrected to match server response
        console.log('Generated image URL:', imageUrl);

        const imgElement = document.getElementById('generatedImage');
        imgElement.src = imageUrl;
        imgElement.style.display = 'block';
    } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
    }
});
