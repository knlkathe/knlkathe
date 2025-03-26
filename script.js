document.getElementById("convertBtn").addEventListener("click", async function () {
    let fileInput = document.getElementById("imageUpload");
    if (fileInput.files.length === 0) {
        alert("कृपया पहले एक छवि अपलोड करें।");
        return;
    }

    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append("image", file);

    let apiURL = "http://127.0.0.1:5000/upload";  // Flask बैकएंड URL

    try {
        let response = await fetch(apiURL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("वीडियो जनरेट करने में समस्या आई");
        }

        let videoBlob = await response.blob();
        let videoURL = URL.createObjectURL(videoBlob);

        let aiVideo = document.getElementById("aiVideo");
        aiVideo.src = videoURL;
        aiVideo.style.display = "block";
    } catch (error) {
        console.error("त्रुटि:", error);
        alert("त्रुटि हुई, कृपया पुनः प्रयास करें।");
    }
});