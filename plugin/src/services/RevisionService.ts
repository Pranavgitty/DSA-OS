export class RevisionService {
	private static readonly MAX_CONFIDENCE = 5;

	private static readonly REVISION_INTERVALS: Record<number, number> = {
		1: 1,
		2: 3,
		3: 7,
		4: 14,
		5: 30,
	};

	/**
	 * Returns today's date in YYYY-MM-DD format.
	 */
	static getToday(): string {
		return new Date().toISOString().slice(0, 10);
	}

	/**
	 * Returns the revision interval (in days)
	 * for the given confidence level.
	 */
	static getRevisionInterval(confidence: number): number {
		return this.REVISION_INTERVALS[confidence] ?? 1;
	}

	/**
	 * Calculates the next revision date.
	 */
	static getNextRevisionDate(confidence: number): string {
		const date = new Date();

		date.setDate(
			date.getDate() + this.getRevisionInterval(confidence)
		);

		return date.toISOString().slice(0, 10);
	}

	/**
	 * Increases confidence by one.
	 * Maximum confidence = 5.
	 */
	static increaseConfidence(current: number): number {
		return Math.min(current + 1, this.MAX_CONFIDENCE);
	}

	/**
	 * Resets confidence to the minimum level.
	 */
	static resetConfidence(): number {
		return 1;
	}
}