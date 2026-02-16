from setuptools import setup, find_packages

setup(
    name='twitter_castle_token',
    version='0.0.2',
    install_requires=[
        'mmh3'
    ],
    python_requires='>=3.10',
    packages=find_packages(include=['castle'])
)