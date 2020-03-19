from pythonrouge import pythonrouge
import pathlib


rouge_dir = pathlib.Path(__file__).parent.joinpath('rouge-perl-1.5.5')
# ROUGE-1.5.5.pl
ROUGE = str(rouge_dir.joinpath("ROUGE-1.5.5.pl").absolute())
# data folder in RELEASE-1.5.5
data_path = str(rouge_dir.joinpath("data").absolute())


def analyze(peer: str, model: str):
    return pythonrouge(peer_sentence=peer, model_sentence=model, ROUGE_path=ROUGE, data_path=data_path)
