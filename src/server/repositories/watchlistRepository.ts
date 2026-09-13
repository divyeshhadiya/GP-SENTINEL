import { WatchlistEntry } from "@/types";
import { initialWatchlist } from "@/data/watchlists";

class WatchlistRepository {
  private watchlists: WatchlistEntry[] = [...initialWatchlist];

  public async findAll(filters?: {
    source?: string;
    category?: string;
    severity?: string;
    query?: string;
  }): Promise<WatchlistEntry[]> {
    let list = [...this.watchlists];

    if (filters?.source && filters.source !== "ALL") {
      list = list.filter((w) => w.source === filters.source);
    }
    if (filters?.category && filters.category !== "ALL") {
      list = list.filter((w) => w.category === filters.category);
    }
    if (filters?.severity && filters.severity !== "ALL") {
      list = list.filter((w) => w.severity === filters.severity);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(
        (w) =>
          w.identifier.toLowerCase().includes(q) ||
          w.details.toLowerCase().includes(q) ||
          (w.registeredOwner && w.registeredOwner.toLowerCase().includes(q)) ||
          (w.firNumber && w.firNumber.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public async findByIdentifier(identifier: string): Promise<WatchlistEntry | null> {
    const clean = identifier.toUpperCase().replace(/[^A-Z0-9]/g, "");
    return (
      this.watchlists.find(
        (w) => w.identifier.toUpperCase().replace(/[^A-Z0-9]/g, "") === clean
      ) || null
    );
  }

  public async create(entry: Partial<WatchlistEntry>): Promise<WatchlistEntry> {
    const newEntry: WatchlistEntry = {
      id: entry.id || `WL-${(entry.source || "VAHAN").slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      identifier: entry.identifier!.toUpperCase().trim(),
      source: entry.source || "VAHAN",
      category: entry.category || "Stolen Vehicle",
      severity: entry.severity || "HIGH",
      details: entry.details || "Command Center Flagged",
      firNumber: entry.firNumber || `FIR-${Math.floor(Math.random() * 900 + 100)}/2026`,
      policeStation: entry.policeStation || "State Cyber Crime Cell, Gandhinagar",
      registeredOwner: entry.registeredOwner || "N/A",
      vehicleMakeModel: entry.vehicleMakeModel || "N/A",
      dateAdded: new Date().toISOString().split("T")[0],
      status: "ACTIVE"
    };

    this.watchlists.unshift(newEntry);
    return newEntry;
  }
}

export const watchlistRepository = new WatchlistRepository();
