import { alertRepository } from "../repositories/alertRepository";
import { AlertEvent } from "@/types";
import { NotFoundError, BadRequestError } from "../utils/errors";

export class AlertService {
  public async getAlerts(filters?: { status?: string; severity?: string }) {
    const alerts = await alertRepository.findAll(filters);
    return {
      total: alerts.length,
      unresolvedCritical: alerts.filter((a) => a.status === "NEW" && a.severity === "CRITICAL").length,
      alerts
    };
  }

  public async getAlertById(id: string): Promise<AlertEvent> {
    const alert = await alertRepository.findById(id);
    if (!alert) {
      throw new NotFoundError(`Incident Alert '${id}' not found`);
    }
    return alert;
  }

  public async updateAlertStatus(
    id: string,
    status: AlertEvent["status"],
    dispatchedUnit?: AlertEvent["dispatchedUnit"],
    notes?: string
  ): Promise<AlertEvent> {
    if (!id || !status) {
      throw new BadRequestError("Both 'id' and 'status' are required to update an incident");
    }

    const updates: Partial<AlertEvent> = { status };
    if (dispatchedUnit) updates.dispatchedUnit = dispatchedUnit;
    if (notes) updates.notes = notes;

    const updated = await alertRepository.update(id, updates);
    if (!updated) {
      throw new NotFoundError(`Incident Alert '${id}' not found`);
    }
    return updated;
  }

  public async dispatchPatrolUnit(
    alertId: string,
    unitName = "Surat City Netram Intercept Unit 14",
    etaMinutes = 4
  ): Promise<AlertEvent> {
    const unit = {
      unitId: `PCR-${Date.now().toString().slice(-4)}`,
      unitName,
      dispatchedAt: new Date().toISOString(),
      etaMinutes
    };

    return await this.updateAlertStatus(alertId, "DISPATCHED", unit);
  }

  public async createAlert(alertData: Partial<AlertEvent>): Promise<AlertEvent> {
    return await alertRepository.create(alertData);
  }
}

export const alertService = new AlertService();
