function verificarLogin(event) {
  event.preventDefault();

  const usuario = document.getElementById('username').value.trim();
  const senha = document.getElementById('password').value.trim();

  if (!usuario || !senha) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  if (usuario === "teste" && senha === "teste") {
  
    window.location.href = "../Educa-/panel.html";
    return true;
  } else {
    alert("Usuário ou matrícula incorretos.");
    return false;
  }
}