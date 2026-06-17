// =====================================
// WIDGET CONFIGURATION
// =====================================

const CONFIG = {
  // Total number of hearts shown in the widget
  totalHearts: 25,

  // Fixed title shown in the widget header
  title: 'Follower Goal',

  // GitHub/portable version:
  // Upload assets/hc-heart.png to Streamlabs Asset and keep the filename as hc-heart.png then copy and paste its path below
  heartImage: 'hc-heart.png'
};

// Streamlabs fires this once when the goal widget first loads
document.addEventListener('goalLoad', (obj) => {
  updateGoalContent(obj.detail);
});

// Streamlabs fires this when the goal updates
document.addEventListener('goalEvent', (obj) => {
  updateGoalContent(obj.detail);
});

// Main function that updates the follower goal widget
function updateGoalContent(detail) {

  // Current follower count from Streamlabs
  const current = detail.amount.current;

  // Target follower count from Streamlabs
  const target = detail.amount.target;

  // Convert current progress into a percentage, capped at 100%
  const percent = Math.min(current / target, 1);

  // Convert the percentage into filled hearts
  const filledHearts = Math.floor(percent * CONFIG.totalHearts);

  // Update the visible text
  document.getElementById('current-amount').textContent = current;
  document.getElementById('target-amount').textContent = target;
  document.getElementById('goal-title').textContent = CONFIG.title;

  // Find the heart container
  const heartBar = document.getElementById('heart-bar');

  // Clear the old hearts before redrawing
  heartBar.innerHTML = '';

  // Build all hearts
  for (let i = 0; i < CONFIG.totalHearts; i++) {

    // Create a fixed-size slot for each heart
    const slot = document.createElement('div');
    slot.classList.add('heart-slot');

    // If this heart falls inside the completed progress range, use the PNG
    if (i < filledHearts) {
      const heart = document.createElement('img');

      heart.src = CONFIG.heartImage;
      heart.classList.add('heart-image', 'filled');

      slot.appendChild(heart);

    // Otherwise, use the transparent/outline heart character
    } else {
      const heart = document.createElement('span');

      heart.textContent = '♡';
      heart.classList.add('heart-text');

      // Assign one of three pulse animations so empty hearts feel less uniform
      if (i % 3 === 0) {
        heart.classList.add('pulse-a');
      } else if (i % 3 === 1) {
        heart.classList.add('pulse-b');
      } else {
        heart.classList.add('pulse-c');
      }

      slot.appendChild(heart);
    }

    // Add the finished heart slot to the bar
    heartBar.appendChild(slot);
  }
}