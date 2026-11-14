(() => {
  const chat = document.getElementById('explorer-chat');
  const form = document.getElementById('explorer-form');
  const input = document.getElementById('explorer-input');
  if (!chat || !form) return;

  const add = (text, role) => {
    const message = document.createElement('div');
    message.className = `explorer-msg ${role}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
  };
  const value = (id) => document.getElementById(id)?.value || '';

  function answer(question) {
    const words = question.toLowerCase();
    const commodity = document.querySelector('.commodity.active')?.dataset.name || '';
    const years = [value('year-from'), value('year-to')].filter(Boolean).join('–');
    const links = document.getElementById('sum-links')?.textContent.trim() || '0';
    const ports = document.getElementById('sum-ports')?.textContent.trim() || '0';

    if (words.includes('how many') || words.includes('possible link')) {
      return commodity
        ? `${commodity} has ${links} possible links across ${ports} ports within the selected years.`
        : 'Choose a commodity first, and I will count its visible possible links and ports.';
    }
    if (words.includes('which port') || words.includes('connected port')) {
      return commodity
        ? `The orange points are the ports possibly connected to ${commodity}. Read their labels or click each orange point for details.`
        : 'Choose a commodity first. Its possibly connected ports will turn orange.';
    }
    if (words.includes('orange') || words.includes('green') || words.includes('colour') || words.includes('color')) {
      return 'Orange ports are linked to the selected commodity within the current years. Green ports are available locations but are not linked to that selection.';
    }
    if (words.includes('carry') || words.includes('deliver')) {
      return 'No. The one-to-one match is a useful clue, but it does not prove that the ship carried or delivered that commodity.';
    }
    if (words.includes('not prove') || words.includes("can't prove") || words.includes('cannot prove')) {
      return 'It cannot prove cargo carriage, delivery, a historical sailing track, or that a voyage became a shipwreck.';
    }
    if (words.includes('prove') || words.includes('evidence')) {
      return 'This map shows possible links made by the one-to-one candidate rule. It does not prove that a ship carried or delivered the commodity, or that the voyage became a shipwreck.';
    }
    if (words.includes('change') || words.includes('filter') || words.includes('year')) {
      return `The current years are ${years || 'the full range'}. ${commodity ? `${commodity} now has ${links} possible links across ${ports} ports. ` : ''}Change one year at a time and compare the routes.`;
    }
    if (words.includes('seeing') || words.includes('show') || words.includes('map')) {
      return commodity
        ? `You selected ${commodity}. Orange ports and pink routes show ${links} possible connections across ${ports} ports; green ports are available but not linked to this selection.`
        : 'You can see the available port cities, but no routes yet. Choose one commodity to reveal its possible Southampton connections.';
    }
    if (words.includes('next') || words.includes('investigate') || words.includes('try')) {
      return commodity
        ? 'Narrow the years, then click an orange port or pink route to inspect the evidence. Compare it with a second commodity afterward.'
        : 'Choose a commodity icon first. Then click a highlighted port or route and read the evidence note.';
    }
    if (words.includes('route') || words.includes('line')) {
      return 'The pink lines show possible associations and follow approximate modern water paths. They are not reconstructed historical tracks or proof of delivery.';
    }
    if (words.includes('shipwreck') || words.includes('sunk') || words.includes('sink')) {
      return 'No. This map cannot tell us that these ships sank. Maritime Britain voyage records and UKHO wreck records have no shared identifier.';
    }
    return 'Try asking what the map shows, how many links are visible, which ports are connected, what the colours mean, what the evidence can prove, or what to investigate next.';
  }

  function ask(question) {
    add(question, 'user');
    input.value = '';
    add(answer(question), 'bot');
  }

  form.onsubmit = (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (question) ask(question);
  };
  document.querySelectorAll('.explorer-suggestions button').forEach((button) => {
    button.onclick = () => ask(button.textContent);
  });
  document.querySelector('.explorer-note').textContent = 'Guided answers use only the map and prepared evidence rules. No personal information is collected.';
})();
