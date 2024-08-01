const create = async (username) => {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    if (data) {
      localStorage.setItem("token", data.token);
    }
  } catch (error) {
    console.log(error);
  }
};

export { create };
