import {
  changeLdapPassword2,
  genOtp2,
  verifyOtpAndChangePassword2,
} from "@/services/ldap/ldap";

export async function PUT(req) {
  const body = await req.json();
  try {
    const { user_password, new_password, email } = body;
    const data = {
      user_password: user_password,
      new_password: new_password,
      email: email,
    };
    const res = await changeLdapPassword2(data);
    return new Response(JSON.stringify(res));
  } catch (error) {
    console.log(error.message);
    if (error.message === "User not found") {
      return new Response(JSON.stringify(error.message), { status: 404 });
    } else if (error.message === "Invalid email or old password") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Invalid email") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Invalid old password") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Password change failed") {
      return new Response(JSON.stringify(error.message), { status: 500 });
    } else {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  try {
    const res = await genOtp2(email);
    console.log(res);
    return new Response(JSON.stringify(res));
  } catch (error) {
    console.log(error.message);
    if (error.message === "User not found") {
      return new Response(JSON.stringify(error.message), { status: 404 });
    } else if (error.message === "Invalid email or old password") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Invalid email") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Something went wrong") {
      return new Response(JSON.stringify(error.message), { status: 500 });
    } else {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  }
}

export async function POST(req) {
  const body = await req.json();
  try {
    const { email, otp, password } = body;
    const data = {
      email: email,
      otp: otp,
      password: password,
    };
    const res = await verifyOtpAndChangePassword2(data);
    return new Response(JSON.stringify(res));
    // Verify otp and change password
  } catch (error) {
    console.log(error.message);
    if (error.message === "Invalid OTP") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "LDAP connection not found") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Invalid email") {
      return new Response(JSON.stringify(error.message), { status: 401 });
    } else if (error.message === "Password change failed") {
      return new Response(JSON.stringify(error.message), { status: 500 });
    } else {
      return new Response(JSON.stringify(error.message), { status: 500 });
    }
  }
}
