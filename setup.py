from setuptools import setup, find_packages

setup(
    name='twitter_castle_token',
    version='0.0.1',
    install_requires=[
        'mmh3'
    ],
    python_requires='>=3.10',
    package_dir={"": "src"},
    packages=find_packages(where="src"),
)