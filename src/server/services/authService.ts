import { UnauthorizedError, BadRequestError } from "../utils/errors";

export interface OfficerProfile {
  id: string;
  name: string;
  badgeId: string;
  rank: string;
  department: string;
  role: "DGP" | "SP_COMMAND" | "TRAFFIC_PI";
  email: string;
}

export class AuthService {
  public async authenticate(email?: string, password?: string) {
    if (!email || !password) {
      throw new BadRequestError("Both 'email' and 'password' are required");
    }

    const cleanEmail = email.toLowerCase().trim();

    let role: OfficerProfile["role"] = "DGP";
    let name = "Dr. Vikas Sahay, IPS";
    let badgeId = "GP-DGP-01";
    let rank = "Director General of Police (DGP)";
    let department = "State Crime Record Bureau (SCRB), Gandhinagar";

    if (cleanEmail.includes("sp.command")) {
      role = "SP_COMMAND";
      name = "Smt. Shweta Shrimali, IPS";
      badgeId = "GP-SP-04";
      rank = "Superintendent of Police (Command & Control)";
      department = "Gujarat State Police Control Room, Gandhinagar";
    } else if (cleanEmail.includes("traffic.pi")) {
      role = "TRAFFIC_PI";
      name = "Inspector R. K. Vala";
      badgeId = "GP-PI-114";
      rank = "Police Inspector (Traffic & Highway Patrol)";
      department = "Ahmedabad City Traffic Police (Netram)";
    }

    const officer: OfficerProfile = {
      id: `OFFICER-${Date.now().toString().slice(-4)}`,
      name,
      badgeId,
      rank,
      department,
      role,
      email: cleanEmail
    };

    const token = `gp_sentinel_jwt_${Buffer.from(cleanEmail).toString("base64")}`;

    return {
      tokenType: "Bearer",
      accessToken: token,
      expiresInSeconds: 86400,
      officer
    };
  }
}

export const authService = new AuthService();
