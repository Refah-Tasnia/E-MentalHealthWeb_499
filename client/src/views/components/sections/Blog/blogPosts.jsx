// BlogPostPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const BlogPosts = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  return (
    <div>
      <div>
        <h4
          style={{
            textAlign: "left",
            fontFamily: "Lucida console", // Change the font family
            fontSize: "30px", // Adjust the font size
            fontWeight: "bold", // Set the font weight to bold
            color: "black",
          }}
        >
          Navigating the Storm: Practical Strategies for Managing Anxiety in
          Everyday Life
          <br />
        </h4>
        <h5>
          Welcome to our mental health space, a refuge for those seeking solace
          and strategies to navigate the storm of anxiety that life sometimes
          brings. In this post, we'll explore practical techniques to help you
          manage anxiety on a day-to-day basis, empowering you to regain control
          and find moments of calm amidst life's challenges.
          <br />
          <br />
          <h3>
            Mindful Breathing: <br />
          </h3>
          The Anchor in the Storm Begin by finding a quiet space. Inhale deeply
          through your nose, counting to four. Hold your breath for a count of
          four. Exhale slowly through your mouth, counting to six. Repeat for a
          few minutes, focusing solely on your breath. This simple practice can
          help ground you in the present moment.
          <br />
          <br />
          <h3>
            Create a Worry Diary: Taming Thoughts Designate a specific time each
            day to jot down your worries.
          </h3>
          <br /> Categorize them into things you can control and things you
          can't. For the things you can control, brainstorm actionable steps.
          Acknowledge and accept the things beyond your control, consciously
          letting them go.
          <br />
          <br />
          <h3>
            Build a Support System: Weathering the Storm Together Identify
            trusted friends, family, or professionals you can turn to.
          </h3>
          <br />
          Share your feelings openly and honestly. Sometimes, just knowing that
          you're not alone in your struggles can provide immense relief.
          <br />
          <br />
          <h3>
            {" "}
            Mindful Movement: Exercising Your Way to Calm Engage in activities
            like yoga, walking, or jogging.
          </h3>
          <br />
          Physical activity releases endorphins, which act as natural mood
          lifters. Regular exercise can contribute to long-term anxiety
          management. <br />
          <br />{" "}
          <h3>
            Digital Detox: Clearing Mental Clutter Designate specific times to
            check emails and social media.
          </h3>
          <br />
          Consider a daily digital detox hour, allowing your mind to rest from
          the constant influx of information. Focus on real-life connections and
          experiences. <br />
          <br />
          <h3>
            Gratitude Journaling: Finding Light in the Darkness Each day, write
            down three things you're grateful for.
          </h3>
          <br /> Cultivate a mindset that appreciates the positive, even in
          challenging times. Over time, this practice can shift your focus and
          contribute to a more positive outlook. Remember, navigating anxiety is
          a journey, not a destination. Be patient with yourself and celebrate
          small victories along the way.
          <br />
          <br />
          The storm may rage, but with these practical strategies, you can
          become the captain of your ship, steering through the challenges with
          resilience and strength. You're not alone on this journey—reach out,
          breathe, and take one step at a time.
        </h5>
      </div>

      <div>
        <textarea placeholder="Write a comment..."></textarea>
        <button>Post Comment</button>
        <Link to="/">Return Home</Link>
      </div>
    </div>
  );
};

export default BlogPosts;
