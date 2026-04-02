/**
 * chatbot.js – Matriculito
 * IA: Groq llama-3.3-70b | Email: EmailJS (envía al destinatario correcto)
 */

/* ══════════════════════════════════════════════
   SYSTEM PROMPT
══════════════════════════════════════════════ */
const SYSTEM_PROMPT = `Eres Matriculito 🎓, la nueva secretaria digital de la Facultad de Ingeniería de Telecomunicaciones de la Universidad Santo Tomás (USTA), sede Bucaramanga. Reemplazas a la antigua secretaria que era lenta, grosera e ineficiente. Tú eres lo opuesto: rapidísima, simpática, proactiva y resolutiva. Tienes personalidad, haces chistes ocasionalmente, usas emojis con moderación y hablas de manera cercana y natural, como alguien que realmente quiere ayudarte.

REGLAS ABSOLUTAS:
1. Solo hablas de temas académicos/administrativos de la USTA Bucaramanga. Si te preguntan otra cosa, redirige con humor: "¡Ajá! Para eso no fui entrenada, soy secretaria, no Google 😄 ¿en qué te puedo ayudar con la U?"
2. Nunca inventas datos, correos o procesos que no conozcas.
3. SIEMPRE confirmas antes de enviar un correo mostrando el borrador completo usando el marcador [EMAIL_DRAFT].
4. Puedes enviar correos a CUALQUIER dirección que el estudiante te indique, aunque no esté en tu directorio. Si el estudiante dice "envíale a pepito@correo.com", lo haces sin problema.
5. El correo del estudiante (tu remitente) es: mariacamila.amara@ustabuca.edu.co
6. NO puedes abrir ni cerrar cupos directamente. Solo gestionas peticiones por correo.
7. Responde siempre en español colombiano natural y conversacional. NADA de respuestas robóticas.

INFORMACIÓN DEL ESTUDIANTE:
Nombre: María Camila Amara Hernández | Código: 2377018
Programa: Ingeniería de Telecomunicaciones – Plan 5 | Semestre: 7
Correo: mariacamila.amara@ustabuca.edu.co

════════════════════════════════════════════════
PENSUM PLAN 5 – ING. TELECOMUNICACIONES
════════════════════════════════════════════════
[TC]=Telecomunicaciones → SIEMPRE hay cupo (solo 15 estudiantes en la carrera)
[CB]=Ciencias Básicas → puede haber cupo limitado (compartidas con otras carreras)
[HUM]=Humanidades → puede haber cupo limitado
[ID]=Idiomas/Lengua Extranjera → puede haber cupo limitado

SEM 1: Cátedra Henry Didón[HUM], Química[CB], Cálculo Diferencial[CB], Álgebra Lineal[CB], Introducción a la Ingeniería[TC], Lengua Extranjera 1[ID]
SEM 2: Taller Lecto-escritura[HUM], Cálculo Integral[CB], Física Mecánica[CB], Electrónica Básica[TC], Lógica de Programación[TC], Lengua Extranjera 2[ID]
SEM 3: Antropología[HUM], Cálculo Vectorial[CB], Ecuaciones Diferenciales[CB], Electrónica Aplicada[TC], POO[TC], Proyecto Integrador 1[TC], Lengua Extranjera 3[ID]
SEM 4: Electricidad y Magnetismo[CB], Probabilidad y Estadística[CB], Sistemas Digitales[TC], Programación Aplicada[TC], Señales y Sistemas[TC], Epistemología[HUM], Lengua Extranjera 4[ID]
SEM 5: Campos y Ondas Electromagnéticas[TC], Teletráfico[TC], Sistemas Operativos[TC], Sistemas de Telecomunicaciones[TC], Procesamiento de la Información[TC], Lengua Extranjera 5[ID]
SEM 6: Medios de Transmisión[TC], Seminario de Investigación[TC], Telemática I[TC], Sistemas de Codificación y Acceso al Medio[TC], Cultura Teológica[HUM], Gestión de Proyectos[TC], Lengua Extranjera 6[ID]
SEM 7 (ACTUAL): Antenas y Propagación[TC]✔, Telemática II[TC]✔, Electiva I[TC]✔, Servicios Multimedia[TC]✔, Filosofía Política[HUM]⚠posible cupo limitado, Cátedra Optativa[TC]✔
SEM 8: Comunicaciones Móviles[TC], Redes Ópticas[TC], Redes Convergentes[TC], Proyecto Integrador 2[TC], Electiva II[TC], Electiva III[TC]
SEM 9: Licitaciones y Contratos[TC], Emprendimiento[TC], Servicios Telemáticos[TC], Electiva IV[TC], Electiva V[TC], Seminario de Grado[TC], Ética[HUM]
SEM 10: Electiva Complementaria[TC], Trabajo de Grado[TC]

════════════════════════════════════════════════
DIRECTORIO DE CORREOS
════════════════════════════════════════════════
Matrículas Teleco: matriculasteleco@ustabuca.edu.co
División Ing. Dirección: dir.divingenierias@ustabuca.edu.co (Fray Juan David Montes Flórez)
División Ing. Secretaría: sec.divingenierias@ustabuca.edu.co
Comité Curricular Teleco: ccurricular.teleco@ustabuca.edu.co
Docentes Teleco: docentes_teleco@ustabuca.edu.co
Secretaría Teleco: sectele@ustabuca.edu.co
Ciencias Básicas CEDII: cedii@ustabuca.edu.co
Ciencias Básicas Dirección: dir.cienciasbasicas@ustabuca.edu.co
Ciencias Básicas Secretaría: sec.cienciasbasicas@ustabuca.edu.co
Humanidades Dirección: dir.humanidades@ustabuca.edu.co
Humanidades Coordinación: coord.humanidades@ustabuca.edu.co
Humanidades Secretaría: sec.humanidades@ustabuca.edu.co
Pagos/Crédito USTA: crediusta@ustabuca.edu.co
Sede Bucaramanga: bucaramanga@usta.edu.co
Admisiones pregrado: admisiones.pregrado@usta.edu.co
Servicios Médicos: sermeflo@ustabuca.edu.co
Investigación: maestria.proyectos@ustabuca.edu.co
Soporte Investigación: p.soporteinvestigacion@ustabuca.edu.co

NOTA IMPORTANTE: También puedes enviar correos a cualquier dirección adicional que el estudiante indique.
════════════════════════════════════════════════
PROFESORES DE TELECOMUNICACIONES
════════════════════════════════════════════════
Puedes enviarle correos directamente a los profesores por nombre o materia.

- Edgar Mauricio Velasco Díaz → edgar.velasco@ustabuca.edu.co
- Silene Beatriz Viloria Soto → silene.viloria@ustabuca.edu.co
- Elizabeth Gelves Gelves → elizabeth.gelves@ustabuca.edu.co
- Yuli Andrea Álvarez Pizarro → yuli.alvarez01@ustabuca.edu.co
- Francisco Javier Dietes Cárdenas → francisco.dietes@ustabuca.edu.co
- Elvis Galvis → elvis.galvis@ustabuca.edu.co

Si el estudiante dice "envíale al profe Velasco" o "escríbele a Silene", 
usas el correo correspondiente sin pedirle que lo escriba manualmente.
════════════════════════════════════════════════
FORMATO OBLIGATORIO PARA CORREOS
════════════════════════════════════════════════
Cuando vayas a redactar un correo usa EXACTAMENTE estos marcadores:

[EMAIL_DRAFT]
PARA: correo_destinatario@dominio.com
CC: correo_cc@dominio.com
ASUNTO: El asunto del correo
MENSAJE:
Estimado/a [nombre o cargo]:

[cuerpo del correo]

Atentamente,
María Camila Amara Hernández
Estudiante – Ingeniería de Telecomunicaciones
Código: 1097493972
Universidad Santo Tomás – Sede Bucaramanga
[EMAIL_DRAFT_END]

Después escribe algo natural como "¿Lo envío? 📤"
Si no hay CC, omite esa línea completamente.
`.trim();

/* ══════════════════════════════════════════════
   ESTADO
══════════════════════════════════════════════ */
let botOpen     = false;
let botTyping   = false;
let history     = [];
let pendingMail = null;

/* ══════════════════════════════════════════════
   INIT – arranca después del login
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar EmailJS con la key real
  if (typeof emailjs !== 'undefined') {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
  }

  // Bienvenida del bot (se activa cuando la pantalla SAC aparece)
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.target.classList.contains('visible')) {
        observer.disconnect();
        setTimeout(() => {
          pushBot(
            `¡Hola, Camila! 👋 Soy **Matriculito**, tu secretaria digital de Teleco 🎓\n\n` +
            `Soy mucho más rápida y simpática que la secretaria de antes 😄 Dime en qué te puedo ayudar: ` +
            `matrículas, certificados, excusas médicas, pagos, o si necesitas enviarle un correo a alguien.`
          );
          document.getElementById('fabBadge').style.display = 'block';
        }, 900);
      }
    }
  });
  observer.observe(document.getElementById('sacScreen'), { attributes: true, attributeFilter: ['class'] });
});

/* ══════════════════════════════════════════════
   TOGGLE
══════════════════════════════════════════════ */
function toggleBot() {
  botOpen = !botOpen;
  const win = document.getElementById('botWindow');
  botOpen ? win.classList.add('open') : win.classList.remove('open');
  if (botOpen) {
    document.getElementById('fabBadge').style.display = 'none';
    setTimeout(() => document.getElementById('botInput').focus(), 250);
  }
}

/* ══════════════════════════════════════════════
   ENVIAR MENSAJE
══════════════════════════════════════════════ */
function handleBotKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendBotMsg(); }
}

function quickMsg(txt) {
  if (!botOpen) toggleBot();
  document.getElementById('botQuick').style.display = 'none';
  document.getElementById('botInput').value = txt;
  sendBotMsg();
}

async function sendBotMsg() {
  const inp  = document.getElementById('botInput');
  const text = inp.value.trim();
  if (!text || botTyping) return;
  inp.value = '';
  document.getElementById('botQuick').style.display = 'none';

  // ¿Esperando confirmación de correo?
  if (pendingMail) {
    const lo  = text.toLowerCase();
    const yes = ['sí','si','yes','confirmar','confirmo','enviar','envíalo','ok','dale','listo','claro','hazlo','mándalo','adelante','va','venga'].some(k => lo.includes(k));
    const no  = ['no','cancelar','cancela','no envíes','no mandes','espera','detén'].some(k => lo.includes(k));
    if (yes) { pushUser(text); await doSendEmail(); return; }
    if (no)  { pendingMail = null; pushUser(text); pushBot('Correo cancelado 😊 ¿Lo ajustamos o necesitas otra cosa?'); return; }
    pendingMail = null;
  }

  pushUser(text);
  await callGroq(text);
}

/* ══════════════════════════════════════════════
   GROQ API
══════════════════════════════════════════════ */
async function callGroq(userMsg) {
  history.push({ role: 'user', content: userMsg });
  botTyping = true;
  document.getElementById('botSendBtn').disabled = true;
  const tid = showTyping();

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: CONFIG.GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
        ],
        temperature: 0.75,
        max_tokens:  1100,
        top_p:       0.9,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `HTTP ${res.status}`);
    }

    const data  = await res.json();
    const reply = data?.choices?.[0]?.message?.content || '';
    history.push({ role: 'assistant', content: reply });
    removeTyping(tid);
    parseAndRender(reply);

  } catch (err) {
    removeTyping(tid);
    console.error('Groq error:', err);
    pushBot(`❌ Ups, tuve un problema: *${err.message}*. Intenta de nuevo en un momento 🙏`);
  } finally {
    botTyping = false;
    document.getElementById('botSendBtn').disabled = false;
  }
}

/* ══════════════════════════════════════════════
   PARSEAR RESPUESTA
══════════════════════════════════════════════ */
function parseAndRender(raw) {
  const rx = /\[EMAIL_DRAFT\]([\s\S]*?)\[EMAIL_DRAFT_END\]/;
  const m  = raw.match(rx);
  if (!m) { pushBot(raw); return; }

  const mail   = parseDraft(m[1].trim());
  pendingMail  = mail;

  const before = raw.slice(0, raw.indexOf('[EMAIL_DRAFT]')).trim();
  const after  = raw.slice(raw.indexOf('[EMAIL_DRAFT_END]') + '[EMAIL_DRAFT_END]'.length).trim();

  if (before) pushBot(before);
  renderEmailDraft(mail, after);
}

function parseDraft(block) {
  const lines  = block.split('\n').map(l => l.trim());
  const mail   = { to: '', cc: '', subject: '', message: '' };
  let inMsg    = false;
  const mLines = [];

  for (const ln of lines) {
    if (ln.startsWith('PARA:'))    { mail.to      = ln.replace('PARA:', '').trim(); continue; }
    if (ln.startsWith('CC:'))      { mail.cc      = ln.replace('CC:', '').trim();  continue; }
    if (ln.startsWith('ASUNTO:'))  { mail.subject = ln.replace('ASUNTO:', '').trim(); continue; }
    if (ln.startsWith('MENSAJE:')) { inMsg = true; continue; }
    if (inMsg) mLines.push(ln);
  }
  mail.message = mLines.join('\n');
  return mail;
}

/* ══════════════════════════════════════════════
   ENVIAR CORREO – EMAILJS
   ⚠️  El truco está en el template de EmailJS:
       El campo "To Email" del template debe usar {{to_email}}
       NO debe estar fijo a tu cuenta.
       Así el correo llega al destinatario correcto.
══════════════════════════════════════════════ */
async function doSendEmail() {
  if (!pendingMail) return;

  if (typeof emailjs === 'undefined') {
    pushBot('❌ No pude cargar EmailJS. Verifica tu conexión a internet.');
    pendingMail = null;
    return;
  }

  const tid      = showTyping();
  const mailCopy = { ...pendingMail };
  pendingMail    = null;

  try {
    const result = await emailjs.send(
      CONFIG.EMAILJS_SERVICE_ID,
      CONFIG.EMAILJS_TEMPLATE_ID,
      {
        // ─── DESTINATARIO ───────────────────────────
        // En tu template de EmailJS el campo "To Email"
        // DEBE ser: {{to_email}}  ← esto envía al correo correcto
        to_email:   mailCopy.to,
        to_name:    '',

        // ─── CC (si aplica) ──────────────────────────
        cc_email:   mailCopy.cc || '',

        // ─── CONTENIDO ───────────────────────────────
        subject:    mailCopy.subject,
        message:    mailCopy.message,

        // ─── REMITENTE ───────────────────────────────
        from_name:  CONFIG.BOT_EMAIL_NAME,
        reply_to:   CONFIG.BOT_EMAIL,
      }
    );

    removeTyping(tid);
    console.log('EmailJS result:', result);
    pushBot(
      `✅ **¡Correo enviado!** 📤\n\n` +
      `📬 **Para:** ${mailCopy.to}\n` +
      (mailCopy.cc ? `📋 **CC:** ${mailCopy.cc}\n` : '') +
      `📝 **Asunto:** ${mailCopy.subject}\n\n` +
      `Te responderán pronto. ¿Necesitas algo más? 😊`
    );
    showToast('✅ Correo enviado correctamente', 'ok');

  } catch (err) {
    removeTyping(tid);
    console.error('EmailJS error:', err);
    pushBot(
      `❌ No pude enviar el correo (${err?.text || err?.message || 'error desconocido'}).\n` +
      `Envíalo manualmente a **${mailCopy.to}**`
    );
    showToast('❌ Error al enviar el correo', 'err');
  }
}

/* ══════════════════════════════════════════════
   RENDER MENSAJES
══════════════════════════════════════════════ */
function pushUser(text) {
  const area = document.getElementById('botMessages');
  const row  = document.createElement('div');
  row.className = 'mrow user';
  row.innerHTML = `<div class="mbubble">${esc(text)}</div>`;
  area.appendChild(row); scrollBot();
}

function pushBot(text) {
  const area = document.getElementById('botMessages');
  const row  = document.createElement('div');
  row.className = 'mrow bot';
  row.innerHTML = `<div class="mavatar">🎓</div><div class="mbubble">${md(text)}</div>`;
  area.appendChild(row); scrollBot();
}

function renderEmailDraft(mail, afterText) {
  const area = document.getElementById('botMessages');
  const row  = document.createElement('div');
  row.className = 'mrow bot';

  const ccHtml    = mail.cc    ? `<div class="draft-line"><strong>CC:</strong> ${esc(mail.cc)}</div>` : '';
  const afterHtml = afterText  ? `<div style="margin-top:9px;font-size:12.5px">${md(afterText)}</div>` : '';
  const uid       = 'draft_' + Date.now();

  row.innerHTML = `
    <div class="mavatar">🎓</div>
    <div class="mbubble">
      <div>Preparé este correo para ti 📝</div>
      <div class="email-draft">
        <div class="draft-head">✉️ Borrador de correo</div>
        <div class="draft-line"><strong>Para:</strong> ${esc(mail.to)}</div>
        ${ccHtml}
        <div class="draft-line"><strong>Asunto:</strong> ${esc(mail.subject)}</div>
        <div class="draft-body">${esc(mail.message)}</div>
      </div>
      <div class="draft-actions" id="${uid}_actions">
        <button class="dbtn-yes" onclick="confirmEmail('${uid}')">✅ Sí, envíalo</button>
        <button class="dbtn-no"  onclick="cancelEmail('${uid}')">❌ Cancelar</button>
      </div>
      ${afterHtml}
    </div>`;
  area.appendChild(row); scrollBot();
}

function confirmEmail(uid) {
  document.querySelectorAll(`#${uid}_actions button`).forEach(b => b.disabled = true);
  doSendEmail();
}
function cancelEmail(uid) {
  document.querySelectorAll(`#${uid}_actions button`).forEach(b => b.disabled = true);
  pendingMail = null;
  pushBot('Correo cancelado 😊 ¿Lo ajustamos o necesitas otra cosa?');
}

/* ══════════════════════════════════════════════
   TYPING + UTILIDADES
══════════════════════════════════════════════ */
function showTyping() {
  const area = document.getElementById('botMessages');
  const row  = document.createElement('div');
  const id   = 'typing_' + Date.now();
  row.id = id; row.className = 'mrow bot';
  row.innerHTML = `<div class="mavatar">🎓</div>
    <div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
  area.appendChild(row); scrollBot();
  return id;
}
function removeTyping(id) { document.getElementById(id)?.remove(); }
function scrollBot() { const a = document.getElementById('botMessages'); a.scrollTop = a.scrollHeight; }

function showToast(msg, type = '') {
  const el = document.getElementById('toastMsg');
  el.textContent = msg; el.className = `toast-msg ${type}`;
  void el.offsetWidth; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3400);
}

function esc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function md(text) {
  let h = esc(text);
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
  h = h.replace(/`(.+?)`/g, '<code style="background:#e4eeff;padding:1px 4px;border-radius:3px;font-size:11.5px">$1</code>');
  h = h.replace(/\n/g, '<br>');
  return h;
}
