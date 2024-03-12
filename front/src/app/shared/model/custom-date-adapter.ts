import { NativeDateAdapter } from "@angular/material/core";

export class CustomDateAdapter extends NativeDateAdapter {
    // Redéfinition de la méthode qui définit comment commence la semaine
    // lundi : 1, mardi : 2, mercredi : 3, …, dimanche : 0
    override getFirstDayOfWeek(): number {
        return 1;
      }
}
