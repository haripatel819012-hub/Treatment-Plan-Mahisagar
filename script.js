function generatePages() {
  const range = document.getElementById('range').value;
  const round = document.getElementById('round').value;
  const beat = document.getElementById('beat').value;
  const place = document.getElementById('place').value;
  const model = document.getElementById('model').value;
  const area = document.getElementById('area').value;
  const year = document.getElementById('year').value;
  const preparedBy = document.getElementById('preparedBy').value;
  const approvedBy = document.getElementById('approvedBy').value;
  const approvalNo = document.getElementById('approvalNo').value;
  const blockCount = parseInt(document.getElementById('blockCount').value);
  const gpsImageFile = document.getElementById('gpsImage').files[0];

  let outputHTML = "";

  // Page 1
  outputHTML += `
    <div class="page">
      <div class="header">
        <img src="gujarat_logo.png" class="logo left">
        <div class="title">
          મહિસાગર વન વિભાગ, લુણાવાડા<br>
          <span>વડોદરા વન વર્તુળ, વડોદરા</span>
        </div>
        <img src="forest_logo.png" class="logo right">
      </div>
      <h1>Treatment Plan - Mahisagar Forest Division</h1>
      <p><b>રેંજનું નામ:</b> ${range}</p>
      <p><b>રાઉન્ડનું નામ:</b> ${round}</p>
      <p><b>બીટનું નામ:</b> ${beat}</p>
      <p><b>સ્થળનું નામ:</b> ${place}</p>
      <p><b>મોડલનું નામ:</b> ${model}</p>
      <div class="footer">મહિસાગર વન વિભાગ, લુણાવાડા<br>વડોદરા વન વર્તુળ, વડોદરા</div>
      <div class="pagenum">Page 1</div>
    </div>
  `;

  // Page 2
  outputHTML += `
    <div class="page">
      <div class="header">
        <img src="gujarat_logo.png" class="logo left">
        <div class="title">
          મહિસાગર વન વિભાગ, લુણાવાડા<br>
          <span>વડોદરા વન વર્તુળ, વડોદરા</span>
        </div>
        <img src="forest_logo.png" class="logo right">
      </div>
      <h2 class="green">ટ્રીટમેન્ટ પ્લાન</h2>
      <table>
        <tr><td><b>સ્થળ</b></td><td>${place}</td></tr>
        <tr><td><b>યોજના / મોડલ</b></td><td>${model}</td></tr>
        <tr><td><b>વિસ્તાર</b></td><td>${area}</td></tr>
        <tr><td><b>વર્ષ</b></td><td>${year}</td></tr>
        <tr><td><b>વિભાગ</b></td><td>મહિસાગર વન વિભાગ</td></tr>
        <tr><td><b>રેંજ</b></td><td>${range}</td></tr>
        <tr><td><b>રાઉન્ડ</b></td><td>${round}</td></tr>
        <tr><td><b>બીટ</b></td><td>${beat}</td></tr>
        <tr><td><b>તૈયાર કરનાર</b></td><td>${preparedBy}</td></tr>
        <tr><td><b>મંજૂરી આપનાર</b></td><td>${approvedBy}</td></tr>
        <tr><td><b>મંજૂર કાર્ય નંબર અને તારીખ</b></td><td>${approvalNo}</td></tr>
      </table>
      <div class="footer">મહિસાગર વન વિભાગ, લુણાવાડા<br>વડોદરા વન વર્તુળ, વડોદરા</div>
      <div class="pagenum">Page 2</div>
    </div>
  `;

  // Page 3
  let tableRows = "";
  const symbols = ["★", "●", "▲", "■", "♦"];
  for (let i = 1; i <= blockCount; i++) {
    let dropdown = `<select>`;
    symbols.forEach(sym => {
      dropdown += `<option value="${sym}">${sym}</option>`;
    });
    dropdown += `</select>`;

    tableRows += `
      <tr>
        <td>બ્લોક - ${i}</td>
        <td>${dropdown}</td>
        <td><input type="text" placeholder="વિગત લખો"></td>
      </tr>`;
  }

  let imageBox = `<div class="image-box"><span>No image uploaded</span></div>`;
  if (gpsImageFile) {
    const imgURL = URL.createObjectURL(gpsImageFile);
    imageBox = `<div class="image-box"><img src="${imgURL}" alt="GPS Map"></div>`;
  }

  outputHTML += `
    <div class="page">
      <div class="header">
        <img src="gujarat_logo.png" class="logo left">
        <div class="title">
          મહિસાગર વન વિભાગ, લુણાવાડા<br>
          <span>વડોદરા વન વર્તુળ, વડોદરા</span>
        </div>
        <img src="forest_logo.png" class="logo right">
      </div>
      <h2 class="green">ટ્રીટમેન્ટ મૅપ (દરેક કોન્ટરની GPS રીડિંગ દર્શાવવી)</h2>
      ${imageBox}
      <table>
        <thead>
          <tr><th>બ્લોક નંબર</th><th>ચિન્હ</th><th>વિગત</th></tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="footer">મહિસાગર વન વિભાગ, લુણાવાડા<br>વડોદરા વન વર્તુળ, વડોદરા</div>
      <div class="pagenum">Page 3</div>
    </div>
  `;

  document.getElementById("output").innerHTML = outputHTML;
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "pt", "a4");

  const pages = document.querySelectorAll("#output .page");
  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  }
  pdf.save("treatment-plan.pdf");
}
