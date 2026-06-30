export class RevisionService {

    /**
     * Returns the next revision interval (in days)
     * based on the user's confidence.
     */
    static getRevisionInterval(confidence: number): number {

        switch (confidence) {
            case 1:
                return 1;

            case 2:
                return 3;

            case 3:
                return 7;

            case 4:
                return 14;

            case 5:
                return 30;

            default:
                return 1;
        }

    }

    /**
     * Calculates the next revision date.
     */
    static getNextRevisionDate(confidence: number): string {

        const date = new Date();

        date.setDate(
            date.getDate() + this.getRevisionInterval(confidence)
        );

        const iso = date.toISOString();

        return iso.substring(0, 10);
    }

    /**
     * Increases confidence by one.
     * Max confidence = 5.
     */ 
    static increaseConfidence(current: number): number {

        return Math.min(current + 1, 5);

    }

}
