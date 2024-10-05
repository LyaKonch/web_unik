// Отримуємо всі елементи з класом "open-modal-btn"
let buttons = document.getElementsByClassName("open-modal-btn");

// Проходимося по кожному елементу та додаємо обробник подій
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // Додаємо клас "open" до елемента з класом "my-modal"
        document.getElementById("my-modal").classList.add("open");

        // Отримуємо елемент iframe
        var iframe = document.querySelector('#my-modal iframe');

        // Встановлюємо src для iframe в залежності від класу кнопки
        if (this.classList.contains('signin')) {
            iframe.src = '/signinform.html';
        } else if (this.classList.contains('login')) {
            iframe.src = '/loginform.html';
        }
    });
}

// закрити вікно модальне
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
    document.getElementById("my-modal").classList.remove("open")
})

// закрити на esc
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("my-modal").classList.remove("open")
    }
});

// закрити поза областю
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('open');
});

const header = document.querySelector("header");
let lastScroll = window.scrollY;
let headerHeight = 80; // Висота заголовка

window.addEventListener("scroll", () => {
    if(document.querySelector('.burger').classList.contains('active')){
        console.log("cacnm")
    } else {
        const currentScrollPosition = window.scrollY;
        if (lastScroll < currentScrollPosition) {
            // Scrolling down
            header.style.transform = `translateY(-${Math.min(currentScrollPosition, 80)}px)`;
        } else {
            // Scrolling up
            header.style.transform = `translateY(0)`;
        }

        lastScroll = currentScrollPosition;
    }
});

if(window.innerWidth<768){
    const navElement = document.querySelector('header nav');

    // Get the nav_container element
    const navContainer = document.querySelector('.nav-container');
    // Move the nav element to the nav_container
    navContainer.appendChild(navElement);
}

document.querySelector('.burger').addEventListener("click", function() {
    this.classList.toggle('active');
    const navElement = document.querySelector(' nav');
    navElement.classList.toggle('open');
});

$(document).ready(function() {
    loadPosts(); // Load posts on page load

    // Function to load posts from a JSON file or API
    function loadPosts() {
        $.ajax({
            url: 'posts.json', // Path to your JSON file
            method: 'GET',
            dataType: 'json',
            success: function(posts) {
                displayPosts(posts);
            },
            error: function(xhr, status, error) {
                console.error('Error loading posts:', error);
            }
        });
    }

    // Function to display posts on the page
    function displayPosts(posts) {
        const postsContainer = $('#posts-container');
        postsContainer.empty(); // Clear existing content

        posts.forEach(function(post) {
            const postElement = $(`
                <div class="post" id="post-${post.id}">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                     <img src="${post.imageUrl}" alt="${post.title}" style="width:100%; border-radius: 5px; margin-top: 10px;" />
                    <button class="like-button" id="like-button-${post.id}">
                        ❤️ Like <span class="like-count">${post.likes || 0}</span>
                    </button>
                </div>
            `);
            postsContainer.append(postElement);
        });

        // Attach click event to like buttons
        $('.like-button').click(function() {
            const postId = $(this).attr('id').split('-')[2]; // Extract post ID
            toggleLike(postId);
        });
    }

    // Function to toggle like status
    function toggleLike(postId) {
        // Simulate like status in localStorage
        const likes = JSON.parse(localStorage.getItem('likes')) || {};
        likes[postId] = !likes[postId]; // Toggle like status
        localStorage.setItem('likes', JSON.stringify(likes));

        // Update the button appearance and like count
        updateLikeButton(postId, likes[postId]);
    }

    // Function to update the like button's appearance
    function updateLikeButton(postId, isLiked) {
        const likeButton = $(`#like-button-${postId}`);
        const likeCount = likeButton.find('.like-count');

        // Change button style and update count
        if (isLiked) {
            likeButton.addClass('liked');
            likeCount.text(parseInt(likeCount.text()) + 1); // Increase count
        } else {
            likeButton.removeClass('liked');
            likeCount.text(parseInt(likeCount.text()) - 1); // Decrease count
        }
    }
});
  




