export class Question {
  constructor(title, calcFn) {
    this.title = title;
    this.answer = null;
    this.calcFn = calcFn;
  }

  static createSection(title, answer) {
    const section = document.createElement("section");
    section.classList.add(
      ...[
        "bg-white",
        "text-black",
        "text-opacity-70",
        "rounded-2xl",
        "shadow-xl",
        "p-8",
      ]
    );
    const h6 = document.createElement("h6");
    h6.classList.add(...["text-md", "font-black"]);
    h6.innerHTML = title.trim();
    section.appendChild(h6);

    if (answer) {
      const textarea = document.createElement("textarea");
      textarea.disabled = true;
      textarea.classList.add(
        ...["w-full", "p-4", "text-black", "text-opacity-70", "text-sm"]
      );
      textarea.value = answer;
      textarea.rows = answer.split("\n").length;
      section.appendChild(textarea);
    }
    return section;
  }

  async getAnswer(query) {
    this.answer = await this.calcFn(query);
    return this;
  }

  output(app) {
    if (this.answer == null || this.title == null) {
      throw "no answer";
    }
    const showText = JSON.stringify(this.answer, null, "    ");
    const titleSection = Question.createSection(this.title);
    const answerSection = Question.createSection("Answer：", showText);

    const div = document.createElement("div");
    div.classList.add("space-y-6");
    div.appendChild(titleSection);
    div.appendChild(answerSection);
    app.appendChild(div);
  }
}
