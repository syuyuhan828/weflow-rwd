// login.js

let isRegistering = false;
let shrinkingFactor = 1;
let rollingSpeed = 1;

function easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
}

function createWaveCircle(radius, amplitude, frequency, phaseShift = 0) {
    const points = 64 * 16;
    const angleStep = (2 * Math.PI) / points;
    let pathData = '';

    for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const x = 250 + (radius + amplitude * Math.sin(frequency * angle + phaseShift)) * Math.cos(angle);
        const y = 250 + (radius + amplitude * Math.sin(frequency * angle + phaseShift)) * Math.sin(angle);
        pathData += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    }

    return pathData + ' Z';
}

function updateWavePaths(phase1, phase2, phase3) {
    const r = 200 * shrinkingFactor;
    document.getElementById('wavePath').setAttribute('d', createWaveCircle(r, 8, 5, phase1));
    document.getElementById('wavePath2').setAttribute('d', createWaveCircle(r, 12, 3, phase2));
    document.getElementById('wavePath3').setAttribute('d', createWaveCircle(r, 7, 4, phase3));
}

function animateWave() {
    const start = Date.now();
    function frame() {
        const t = Date.now() - start;
        updateWavePaths((t * rollingSpeed) / 300, (t * rollingSpeed) / 400, (t * rollingSpeed) / 350);
        requestAnimationFrame(frame);
    }
    frame();
}

function shrinkWave() {
    document.querySelector('.login-form').style.opacity = '0';
    function shrink() {
        if (shrinkingFactor > 0.1) {
        shrinkingFactor -= 0.02;
        rollingSpeed = 1 + (1 - easeOut(shrinkingFactor)) * 4;
        requestAnimationFrame(shrink);
        }
    }
    shrink();
}

function expandWave() {
    document.querySelector('.login-form').style.opacity = '1';
    function expand() {
        if (shrinkingFactor < 1) {
        shrinkingFactor += 0.02;
        rollingSpeed = 1 + (1 - easeOut(1 - shrinkingFactor)) * 4;
        requestAnimationFrame(expand);
        }
    }
    expand();
}

document.addEventListener('DOMContentLoaded', () => {
    animateWave();

    const toggleLink = document.getElementById('toggleLink');
    const formTitle = document.getElementById('formTitle');
    const submitButton = document.getElementById('submitButton');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    toggleLink.onclick = () => {
        isRegistering = !isRegistering;
        formTitle.textContent = isRegistering ? 'Register' : 'Login';
        submitButton.textContent = isRegistering ? 'Register' : 'Login';
        toggleLink.textContent = isRegistering ? 'Already have an account? Login' : 'New user? Register';
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
    };

    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        if (!username || !password) {
        errorMessage.textContent = 'Please enter both username and password.';
        errorMessage.style.display = 'block';
        } else {
        console.log(`${isRegistering ? 'Registering' : 'Logging in'} user: ${username}`);
        // Implement login/register logic here
        }
    };
});
