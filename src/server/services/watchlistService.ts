import { watchlistRepository } from "../repositories/watchlistRepository";
import { WatchlistEntry } from "@/types";
import { BadRequestError } from "../utils/errors";

export class WatchlistService {
  public async getWatchlists(filters?: {
    source?: string;
    category?: string;
    severity?: string;
    query?: string;
  }) {
    const list = await watchlistRepository.findAll(filters);
    return {
      total: list.length,
      vahanCount: list.filter((w) => w.source === "VAHAN").length,
      eGujCopCount: list.filter((w) => w.source === "eGujCop").length,
      watchlists: list
    };
  }

  public async addEntry(data: Partial<WatchlistEntry>): Promise<WatchlistEntry> {
    if (!data.identifier || !data.source || !data.category) {
      throw new BadRequestError("Fields 'identifier', 'source', and 'category' are mandatory for watchlist addition");
    }
    return await watchlistRepository.create(data);
  }

  public async checkPlate(plate: string): Promise<WatchlistEntry | null> {
    return await watchlistRepository.findByIdentifier(plate);
  }
}

export const watchlistService = new WatchlistService();
