import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let role = "DGP";
    let name = "Dr. Vikas Sahay, IPS";
    let badgeId = "GP-DGP-01";
    let rank = "Director General of Police (DGP)";
    let department = "State Crime Record Bureau (SCRB), Gandhinagar";

    if (email.includes("sp.command")) {
      role = "SP_COMMAND";
      name = "Smt. Shweta Shrimali, IPS";
      badgeId = "GP-SP-04";
      rank = "Superintendent of Police (Command & Control)";
      department = "Gujarat State Police Control Room, Gandhinagar";
    } else if (email.includes("traffic.pi")) {
      role = "TRAFFIC_PI";
      name = "Inspector R. K. Vala";
      badgeId = "GP-PI-114";
      rank = "Police Inspector (Traffic & Highway Patrol)";
      department = "Ahmedabad City Traffic Police (Netram)";
    }

    const user = {
      id: `OFFICER-${Date.now().toString().slice(-4)}`,
      name,
      badgeId,
      rank,
      department,
      role,
      email
    };

    return NextResponse.json({
      status: "SUCCESS",
      message: "Officer verified successfully",
      access_token: `gp_sentinel_jwt_${Buffer.from(email).toString("base64")}`,
      token_type: "bearer",
      user
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid login payload", details: err.message },
      { status: 500 }
    );
  }
}
